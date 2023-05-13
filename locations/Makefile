LOCATIONS = \
	james-flemings-office \
	walkers-shop \
	burnside-cottage \
	dunleigh \
	gasworks \
	orphanage-tower \
	st-margarets \
	fisherton \
	parish-church \
	drill-hall \
	station-bar \
	parish-hall \
	graveyard
LOCATIONS_BASE_URL := https://aberlourtrails.org/locations/

pdfs: $(LOCATIONS:=.pdf)

%.pdf: %.svg
	inkscape $< --export-filename=$@

# qrencode's SVG output consists of hundreds of 1x1 px rectangles. While this
# is technically correct, many vector renderers will incorrectly display the
# infinitely-narrow lines between these rectangles. To avoid these rendering
# errors – not to mention to dramatically reduce the size of the SVG – we'll
# union all of the rectangles into a single path.
%-raw.svg:
	qrencode -o $@ -t svg $(LOCATIONS_BASE_URL)$*

# qrencode describes the dimensions of the SVG document in physical units (cm).
# When we perform almost any modifications in Inkscape, it tries to convert
# back and forth between physical units and pixels, and coordinates end up
# having infinitesimal fractional parts. To retain nice integer units, we need
# to convince Inkscape to think about the document only in terms of pixels;
# that means adjusting the document's dimensions to be expressed purely in
# those terms.
#
# First, extract the pixel width of the QR code from its viewBox. We can't just
# hard-code this value because the dimensions of the document change based on
# its complexity (length of encoded data).
%-viewBox-width: %-raw.svg
	xmlstarlet \
		sel \
		--text \
		--template \
		--value-of '//_:svg/@viewBox' \
		$< \
	| cut -d ' ' -f 3 \
	>$@

# qrencode takes advantage of the unit conversion from pixels to centimetres to
# scale the 1x1 px rectangles to the desired display size. If we're converting
# to entirely pixel units, we'll need to calculate our own desired final output
# side length based on our desired scale factor.
%-desired-document-width: %-viewBox-width
	echo "$(shell cat $<) * 4" | bc >$@

.PRECIOUS: %.svg
%.svg: %-raw.svg %-desired-document-width
# We can make our edits directly to the qrencode output file: that was only
# created with a different filename so that the intermediary targets could also
# depend on it.
	mv $< $@

# Now we can replace the physical units describing the document dimensions with
# pure pixel counts.
	xmlstarlet \
		ed \
		--inplace \
		--update '//_:svg/@width' --value $(shell cat $*-desired-document-width) \
		--update '//_:svg/@height' --value $(shell cat $*-desired-document-width) \
		$@

# Now that the document dimensions are measured in the same unit as (and are an
# integer multiple of) the viewBox dimensions, we can generate the
# pixel-perfect union of the rectangle paths.
	inkscape \
		$@ \
		--actions=";\
			select-all: all; \
			selection-ungroup; \
			select-clear; \
			select-by-id: Pattern; \
			selection-ungroup; \
			path-union; \
			" \
		--export-type=svg \
		--export-plain-svg \
		--export-filename=$@

# Inkscape adds a redundant XML namespace declaration which XMLStarlet is
# incapable of deleting. We'll cross our fingers and rip it out with sed.
	sed -i '' -e 's/xmlns:svg="[^"]*"//' $@

# Finally, we can clean up some stray cruft in the document: the “Created with
# qrencode” comment, the empty defs, and the auto-generated element IDs.
	xmlstarlet \
		ed \
		--inplace \
		--delete '//comment()' \
		--delete '//*/@id' \
		--delete '//_:defs' \
		$@

	xmlstarlet fo --indent-spaces 4 $@ >$@-tmp
	mv $@-tmp $@
