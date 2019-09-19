const align = ['align', { indent: '-1' }, { indent: '+1' }];
const clean = ['clean'];
const code = ['blockquote', 'code-block'];
const embed = ['image', 'video'];
const header = [
    {
        header: [1, 2, 3, false]
    }
];
const lists = [{ list: 'ordered' }, { list: 'bullet' }];
const styles = ['bold', 'italic', 'underline', 'strike'];

export default [header, styles, lists, align, code, embed, clean];
