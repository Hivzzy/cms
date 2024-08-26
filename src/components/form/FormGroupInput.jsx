import { Form } from 'react-bootstrap'

const FormGroupInput = ({isJustDetail, register, errors, label, name, min, max}) => {
    return (
        <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="text" placeholder={label} readOnly={isJustDetail}
                {...register('position', {
                    required: 'Position is required',
                    minLength: min,
                    maxLength: max
                })} isInvalid={errors[name]}
            />
            {errors[name] ?
                <Form.Control.Feedback type="invalid">
                    {errors[name]?.message}
                </Form.Control.Feedback>
                : <br></br>
            }
        </Form.Group>
    )
}

export default FormGroupInput