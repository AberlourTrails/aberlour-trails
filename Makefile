_site/assets/js/gc.js:
	mkdir -p $(@D)
	curl --location --output $@ http://gc.zgo.at/count.js
