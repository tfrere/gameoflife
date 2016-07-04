import React, { Component, PropTypes } from 'react';
import { create } from 'jss';
import reactJss from 'react-jss';
import camelCase from 'jss-camel-case';
import px from 'jss-px';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';
import Swipeable from 'react-swipeable';
import classNames from 'classnames';

export let jss = create();
export let useSheet = reactJss(jss);
jss.use(camelCase());
jss.use(nested());
jss.use(px());
jss.use(vendorPrefixer());

import utils from './utils';
import Fade from './Fade';
import Icon from './Icon';
import Portal from './Portal';

import defaultStyles from './styles/default';

class Lightbox extends Component {

	static theme (themeStyles) {
		const extStyles = Object.assign({}, defaultStyles);
		for (const key in extStyles) {
			if (key in themeStyles) {
				extStyles[key] = Object.assign({}, defaultStyles[key], themeStyles[key]);
			}
		}
		return extStyles;
	}

	constructor () {
		super();

		utils.bindFunctions.call(this, [
			'close',
			'gotoNext',
			'gotoPrev',
			'handleImgLoad',
			'handleImageClick',
			'handleKeyboardInput',
			'handleResize',
		]);

		this.state = { windowHeight: 0, isImgLoaded: false, imgWidth: 0 };

	}

	componentWillReceiveProps (nextProps) {
		if (!utils.canUseDom) return;

		if (nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
		} else {
			window.removeEventListener('keydown', this.handleKeyboardInput);
			window.removeEventListener('resize', this.handleResize);
		}

		if (nextProps.isOpen) {
			utils.bodyScroll.blockScroll();
		} else {
			utils.bodyScroll.allowScroll();
		}
	}

	// ==============================
	// METHODS
	// ==============================

	close (e) {
		if (e && e.target.id !== 'react-images-container') return;

		this.setState({ isBuyOpen: false,
		isImgLoaded: false });

		if (this.props.backdropClosesModal && this.props.onClose) {
			this.props.onClose();
		}

	}

	gotoNext (event) {
		if (this.props.currentImage === (this.props.images.length - 1)) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickNext();
		this.setState({
			isBuyOpen: false,
			isImgLoaded: false
		});

	}

	gotoPrev (event) {
		if (this.props.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickPrev();
		this.setState({
			isBuyOpen: false,
			isImgLoaded: false
		});
	}

	handleImageClick () {

		if(this.state.isBuyOpen) {
			this.buyThisPhoto();
			return ;
		}
		if (!this.props.onClickImage)
			return;
		if (this.props.currentImage === (this.props.images.length - 1))
		{
			this.close();
			return ;
		}

		this.props.onClickImage();

		this.setState({
			isBuyOpen: false,
			isImgLoaded: false
		});

	}

	handleKeyboardInput (event) {

		if (event.keyCode === 37) {
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) {
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) {
			this.props.onClose();
			return true;
		}
		return false;

	}

	handleResize (event) {

		this.setState({
			windowHeight: window.innerHeight || 0
		});

	}

	handleImgLoad (event) {
		var imgWidth = event.target.offsetWidth;
        setTimeout( (imgWidth) => {
			this.setState({
				isImgLoaded: true,
				imgWidth: imgWidth
			});
		}, 200);
	}


	// ==============================
	// RENDERERS
	// ==============================

	renderArrowPrev () {
		if (this.props.currentImage === 0) return null;
		const { classes } = this.props.sheet;

		return (
			<button title="Previous (Left arrow key)"
				type="button"
				className={`${classes.arrow} ${classes.arrowPrev}`}
				onClick={this.gotoPrev}
				onTouchEnd={this.gotoPrev}
			>
				<Icon type="arrowLeft" />
			</button>
		);
	}

	renderArrowNext () {
		if (this.props.currentImage === (this.props.images.length - 1)) return null;
		const { classes } = this.props.sheet;
		return (
			<button title="Next (Right arrow key)"
				type="button"
				className={`${classes.arrow} ${classes.arrowNext}`}
				onClick={this.gotoNext}
				onTouchEnd={this.gotoNext}
				>
				<Icon type="arrowRight" />
			</button>
		);
	}

	renderCloseButton () {
		if (!this.props.showCloseButton) return null;
		const { classes } = this.props.sheet;

		return (
			<div className={classes.closeBar}>
				<button
					title="Close (Esc)"
					className={classes.closeButton}
					onClick={this.props.onClose}
					>
					<Icon type="close" />
				</button>
			</div>
		);
	}

	renderDialog () {
		if (!this.props.isOpen) return null;
		const { classes } = this.props.sheet;

		return (
			<Fade id="react-images-container"
				key="dialog"
				duration={250}
				className={classes.container}
				onClick={this.close}
				onTouchEnd={this.close}
			>
				<span className={classes.contentHeightShim} />
				<div className={classes.content}>
					{this.renderCloseButton()}
					{this.renderImages()}
				</div>
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
			</Fade>
		);
	}

	renderFooter (caption, subCaption, showBuyButton) {
		const { currentImage, images, imageCountSeparator, showImageCount } = this.props;
		const { classes } = this.props.sheet;
		const { prices } = images[currentImage];

		// ajout du statut isImgLoaded pour prévenir un affichage sans l'image
		if (!caption && !showImageCount && !this.state.isImgLoaded) return null;

		const imageCount = showImageCount ? (
			<div className={classes.footerCount}>
				{currentImage + 1}
				{imageCountSeparator}
				{images.length}
			</div>)
			: null;
		const figcaption = caption
			? <figcaption className={classes.footerCaption}>
				<span>{caption}<br/><span>{subCaption}</span></span>
			  </figcaption>
			: null;

		return ( <div style={{opacity: this.state.isImgLoaded ? '1' : '0', transition: 'all 0s ease' }} className={classes.footer}>
					{imageCount}
					{figcaption}
				</div> );
	}

	renderImages () {
		const { images, currentImage } = this.props;
		const { classes } = this.props.sheet;
		const { windowHeight } = this.state;
		const { prices } = images[currentImage];

		if (!images || !images.length) return null;

		const image = images[currentImage];

		let srcset;
		let sizes;

		if (image.srcset) {
			srcset = image.srcset.join();
			sizes = '100vw';
		}

		const ratio = image.thumbnailRatio;
		let imageOffset = "translateY(-70vh)";

		return (
			<div>
				<figure key="gallery"
					className={classes.figure}
					style={{ maxWidth: this.props.width }} >
					<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev}>
						<img
							className={classes.image}
							onClick={this.handleImageClick}
							sizes={sizes}
							onLoad={this.handleImgLoad}
							src={image.src}
							height={image.height}
							srcSet={srcset}
							style={{
								cursor: this.props.onClickImage ? 'pointer' : 'auto',
								maxHeight: windowHeight,
							}}
						/>
					</Swipeable>
					{this.renderFooter(image.caption, image.subCaption)}
				</figure>
            </div>
		);
	}

	render () {
		return (
			<Portal>
				{this.renderDialog()}
			</Portal>
		);
	}
}

Lightbox.displayName = 'Lightbox';

Lightbox.propTypes = {
	backdropClosesModal: PropTypes.bool,
	currentImage: PropTypes.number,
	enableKeyboardInput: PropTypes.bool,
	imageCountSeparator: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array,
			caption: PropTypes.string,
			prices: React.PropTypes.object
		})
	).isRequired,
	isOpen: PropTypes.bool,
	onClickImage: PropTypes.func,
	onClickNext: PropTypes.func,
	onClickPrev: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	sheet: PropTypes.object,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	width: PropTypes.number,
};

Lightbox.defaultProps = {
	backdropClosesModal: true,
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	onClickShowNextImage: true,
	showCloseButton: false,
	showImageCount: false,
	width: 900,
};

export default useSheet(Lightbox, defaultStyles);
