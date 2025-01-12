import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth.context';

const useLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.username || !formData.password) {
            toast.error('Vui lòng điền đầy đủ thông tin!', {
                duration: 3000,
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (data.success) {
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setAuthUser(data.user);
                
                await toast.success('Đăng nhập thành công!', {
                    duration: 3000,
                });
                
                setTimeout(() => {
                    if (data.user.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                }, 1000);
            } else {
                toast.error(data.message || 'Sai tên đăng nhập hoặc mật khẩu!', {
                    duration: 3000,
                });
                setFormData(prev => ({
                    ...prev,
                    password: ''
                }));
            }
        } catch (err) {
            console.error('Login error:', err);
            toast.error('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!', {
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return { formData, loading, handleChange, handleSubmit };
};

export default useLogin;
