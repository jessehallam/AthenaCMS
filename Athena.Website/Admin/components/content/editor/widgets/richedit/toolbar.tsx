const align = [{ align: [] }];
const code = ['blockquote', 'code-block'];
const embed = ['link', 'image'];
const font = [{ font: [] }];
const header = [{ header: [1, 2, 3, 4, 5, false] }];
const indent = [{ indent: '-1' }, { indent: '+1' }];
const lists = [{ list: 'ordered' }, { list: 'bullet' }];
const styles = ['bold', 'italic', 'underline', 'strike'];

interface Toolbar {
    quill: Quill;
}

export default {
    container: [header, styles, font, lists, align, indent, code, embed],
    handlers: {
        image: function(this: Toolbar) {
            console.log(this.quill);
        }
    }
};
