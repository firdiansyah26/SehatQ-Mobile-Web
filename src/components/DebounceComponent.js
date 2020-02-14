import { debounce } from "debounce";

const debouncedOnChange = debounce((e, onChange) => {
    onChange(e)
}, 600)
const persistedOnChange = (onChange) => (e, a) => {
    e.persist()
    debouncedOnChange(e, onChange)
}
const PersistedInput = ({ renderInput, onChange, dashState, ...props }) => renderInput({ ...props, onChange: persistedOnChange(onChange) })

export default PersistedInput