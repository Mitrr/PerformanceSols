<script>
    export default {
        name: "Icon",
        functional:true,
        props:{
            icon:String,

        },
        render(h,context) {

            const iconName = context.props.icon;

            // const iconHandler = {
            //     "delete_outline": function () {
            //         return "delete_outline.svg";
            //     }
            // };

            //const svgName = iconHandler[iconName]();

            const iconHandler = {
                "delete_outline": function () {
                            return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0V0z"`;
                        }
            };

            const innerHTML = iconHandler[iconName]();

            return h('div', {
                domProps:{
                    innerHTML:innerHTML
                },

            });
        }
    }
</script>

