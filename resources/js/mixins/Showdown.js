'use strict'

import showdown from 'showdown'

var converter = new showdown.Converter()

export default {
	computed: {
		converter() {
			return converter
		}
	}
}