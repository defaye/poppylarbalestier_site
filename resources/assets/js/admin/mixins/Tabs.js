export default {
    data() {
        return {
            tab: undefined
        }
    },
    mounted() {
        const url = new URL(window.location.href);
        const params = url.searchParams;
        let  tab = url.searchParams.get("tab");
        this.tab = tab ? tab : "main";
    },
    methods: {
        changeTabTo(tab) {
            const url = new URL(window.location);
            const params = url.searchParams;
            params.set("tab", tab);
            this.tab = tab;
            window.history.pushState({ tab }, null, url.toString());
        }
    }
}
