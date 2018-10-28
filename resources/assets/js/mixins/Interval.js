export default {
    methods: {
        interval: function (func, wait, times) {
            const interv = ((w, t) => () => {
                if (typeof t === "undefined" || t-- > 0) {
                    setTimeout(interv, w)
                    try {
                        func.call(null)
                    } catch (e) {
                        t = 0
                        throw e.toString()
                    }
                }
            })(wait, times)

            setTimeout(interv, wait)
        }
    }
}
