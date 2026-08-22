#!/bin/bash

cd docs/public/images/gallery/thumbnails
mogrify -resize 10% -format webp -path ./ ../*.png
mogrify -resize 10% -format webp -path ./ ../*.jpg
