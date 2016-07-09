#!/bin/sh

# Normalize 
# =============

cd ./raw

# printf "====\n Renaming files \n====\n"

# for file in *.JPG; do
# 	mv "$file" "`basename "$file" .JPG`.jpg"
# done

# for file in *.JPEG; do
# 	mv "$file" "`basename "$file" .JPG`.jpg"
# done

# for file in *.jpeg; do
# 	mv "$file" "`basename "$file" .JPG`.jpg"
# done


# Rename by numeric value
# =============

# printf "====\n Renaming \n====\n"

# ls | cat -n | while read n f; do mv "$f" "$n.jpg"; done 

# cd ./..


# Copy all images into each folders
# =============

# printf "====\n Copying files \n====\n"

# mkdir small
# mkdir medium
# mkdir large

# cp ./raw/*.jpg ./small/
# cp ./raw/*.jpg ./medium/
# cp ./raw/*.jpg ./large/

# Resize
# =============

# printf "====\n Progessing small \n====\n"
# cd small
# mogrify -quality 80 -resize x300 *.jpg

# printf "==== \nProcessing medium \n====\n"
# cd ../medium
# mogrify -quality 80 -resize x800 *.jpg

# printf "==== \nProcessing large \n====\n"
# cd ../large
# mogrify -quality 80 -resize x1200 *.jpg

# Generating object
# =============

# printf "====\n Generating object \n====\n"

cd ../small

rm -f pictures.js
touch pictures.js

echo "var Pictures = [" >> pictures.js

pwd

for file in *.jpg; do

	W=`identify -format '%w' $file` #width
	H=`identify -format '%h' $file` #height
	R=`identify -format '%[fx:w/h]' $file` #ratio
	echo $W
	echo $H
	echo $R

	echo "
	{
		src:\"images/portfolio/jpgs/photos/large/"$file"\",
		thumbnail:\"images/portfolio/jpgs/photos/small/"$file"\",
		thumbnailWidth: $W,
		thumbnailHeight: $H,
		thumbnailRatio: $R,
		srcset: [
			\"images/portfolio/jpgs/photos/large/"$file" 1024w\",
			\"images/portfolio/jpgs/photos/medium/"$file" 800w\",
			\"images/portfolio/jpgs/photos/small/"$file" 500w\",
			\"images/portfolio/jpgs/photos/small/"$file" 320w\"
		],
		caption:\"test\",
		subCaption:\"test\"
	}," >> pictures.js

done

echo "]; export default Pictures;" >> pictures.js

mv pictures.js ../

# This is the end
# =============

# printf "====\nThis is the end\n====\n"
