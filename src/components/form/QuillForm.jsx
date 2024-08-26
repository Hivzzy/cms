import { useEffect } from 'react'
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

const QuillForm = ({ formError, setValue, register, formName, validationRules, initialValue, customHeight = '300px' }) => {
    
    const theme = 'snow';
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            [{ 'align': [] }],
            [{ 'background': [] }],

            ['bold', 'italic', 'underline', 'strike', 'clean'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['code-block', 'blockquote']
        ]
    }

    const formats = [
        'header', 'align', 'background',
        'bold', 'italic', 'underline', 'strike',
        'list',
        'link', 'image', 'code-block', 'blockquote'
    ];

    const { quill, quillRef } = useQuill({ theme, modules, formats });

    useEffect(() => {
        register(formName, validationRules);
    }, [register, formName, validationRules]);

    useEffect(() => {
        if (quill && initialValue) {
            quill.clipboard.dangerouslyPasteHTML(initialValue);
        }
        setValue(formName, initialValue);
    }, [quill, initialValue, setValue, formName]);

    useEffect(() => {
        if (quill) {
            // quill.clipboard.dangerouslyPasteHTML(initialValue);
            quill.on('text-change', () => {
                // console.log('quill-text', quill.getText()); // Get text only
                // console.log('quill-delta-content', quill.getContents()); // Get delta contents
                // console.log('quillRef-html', quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
                setValue(formName, quill.root.innerHTML)
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quill, setValue]);

    return (
        <>
            <div style={{ border: formError ? '1px solid #c03221' : '' }}>
                <div ref={quillRef} style={{ height: customHeight }} />
            </div>
            <span style={{ color: '#c03221', fontSize: '0.875em', marginTop: '0.25rem' }}>{formError?.message}</span>
        </>
    )
}

QuillForm.propTypes = {
    formError: PropTypes.object,
    setValue: PropTypes.func,
    register: PropTypes.func,
    formName: PropTypes.string,
    validationRules: PropTypes.object,
    initialValue: PropTypes.string,
}

export default QuillForm