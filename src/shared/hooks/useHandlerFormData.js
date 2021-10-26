import { useCallback, useState } from "react";

export default function useHandlerFormData(initialData) {
    const [formData, setFormData] = useState(initialData || {})

    const handlerFormData = useCallback(({name, value}) => {
        setFormData({...formData, [name]: value})
    }, [formData])

    const cleanFormData = () => setFormData({})

    return {formData, handlerFormData, cleanFormData}
}