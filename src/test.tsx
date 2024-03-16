import { defineComponent, ref, watch } from "vue";

export default defineComponent({
    props: {
        data: Object,
        onChange: Function,
    },
    setup(props) {
        const refEl = ref();


        watch(() => props.data.content, () => {
            console.log(props.data.content);
        }) 

        setTimeout(() => {
            props.onChange({content: 'b'})
        }, 2000)

        return () =>{
            return <div ref={refEl}>hello</div>
            // return [1, 2, 3].map(item => {
            //     return <div style="color: red;" ref={refEl} ref_for={true}>{item}</div>
            // })
        }
    }
})