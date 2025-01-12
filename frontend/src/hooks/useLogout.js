import { useState } from "react";
import { useAuthContext } from "../context/auth.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/user/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include"
			});
			const data = await res.json();
			if (!data.success) {
				throw new Error(data.message);
			}

			localStorage.removeItem("user");
			localStorage.removeItem("auth-token");
			setAuthUser(null);
			toast.success("Đăng xuất thành công!");
			navigate("/login");
		} catch (error) {
			toast.error("Có lỗi xảy ra khi đăng xuất!");
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};

export default useLogout;