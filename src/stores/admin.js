import {defineStore} from "pinia";
import {reactive} from 'vue';

/**
 * 保存登录时管理员的信息
 */
export const useAdminStore = defineStore('admin', () => {
        let admin = reactive({
            id: '',
            username: '',
            password: '',
            nickname: '',
            token: ''
        });
        const setAdmin = (data) => {
            Object.keys(admin).forEach(key => {
                admin[key] = data[key] || '';
            });
        }
        const clearAdmin = () => {
            localStorage.removeItem('admin');
        }
        return {
            admin, setAdmin, clearAdmin
        }
    },
    {
        persist: true
    }
)
