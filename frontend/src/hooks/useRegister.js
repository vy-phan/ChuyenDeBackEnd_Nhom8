import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const useRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            console.log("Response from server:", data);

            if (data.success) {
                // Lưu email và thời gian hết hạn vào localStorage
                const expirationTime = new Date().getTime() + 10 * 60 * 1000; // 10 phút
                localStorage.setItem('verificationEmail', formData.email);
                localStorage.setItem('verificationEmailExpires', expirationTime.toString());

                // Thiết lập timeout để tự động xóa sau 10 phút
                setTimeout(() => {
                    localStorage.removeItem('verificationEmail');
                    localStorage.removeItem('verificationEmailExpires');
                }, 10 * 60 * 1000);
                
                toast.success(data.message || 'Đăng ký thành công! Vui lòng kiểm tra email.');
                navigate('/verify-email', { 
                    state: { email: formData.email } 
                });
            } else {
                toast.error(data.message || 'Đăng ký thất bại');
            }
        } catch (err) {
            console.error("Registration error:", err);
            toast.error('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return { formData, loading, handleChange, handleSubmit };
}

export default useRegister;
