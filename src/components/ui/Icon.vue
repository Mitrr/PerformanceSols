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
                },
                "add_circle_outline": function () {
                    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`;
                },
                "edit": function () {
                    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
                }
            };

            const innerHTML = iconHandler[iconName]();

            return h('div', {
                domProps:{
                    innerHTML:innerHTML
                },
                style:{
                    display:'flex',
                    lineHeight:1
                }

            });
        }
    }
</script>

