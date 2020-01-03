<template>
  <div>
    <div :style="'height: '+divHeight">
      <quill-editor
        v-model="content"
        :options="editorOption"
        @change="handleDataFc"
      >
      </quill-editor>
    </div>
  </div>
</template>

<!-- <script src="/node_modules/quill-image-resize-module/image-resize.min.js"></script> -->
<script>
import { Quill } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
// import { ImageResize } from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
// Quill.register('modules/imageResize', ImageResize)
export default {
  data: function () {
    return {
      content: '',
      customToolbar: [
        [{ font: [] }],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        [{ header: 1 }, { header: 2 }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video', 'formula'],
        [{ direction: 'rtl' }],
        ['clean'],
      ],
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ['small', false, 'large'] }],
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
          imageDrop: true,
          /*imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white',
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar'],
          },*/
        },
      },
    }
  },
  props: {
    htmlEditorContent: {
      type: String,
      default () {
        return ''
      },
    },
    divHeight: {
      type: String,
      default () {
        return ''
      },
    },
    htmlEditorHeight: {
      type: String,
      default () {
        return ''
      },
    },
  },
  methods: {
    handleDataFc: function () {
      this.$emit('interface', this.content);
    },
  },
  beforeMount () {
    this.content = this.htmlEditorContent
  },
}
</script>
<style scope>
.fixedHeight {
  height: 300px;
}
</style>
<style lang="css">
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
</style>
