'use strict'
export default function (content) {
	return content.replace(/\\n|\\r/g, '<br>')
}