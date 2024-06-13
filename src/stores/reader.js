import {defineStore} from "pinia";
import {reactive} from 'vue';

/**
 * 保存登录时用户的信息
 */
export const useReaderStore = defineStore('reader', () => {
        let reader = reactive({
            id: '',
            username: '',
            password: '',
            nickname: '',
            gender: '',
            age: '',
            tel: '',
            token: ''
        });
        // 保存用户的信息
        const setReader = (data) => {
            Object.keys(reader).forEach(key => {
                reader[key] = data[key] || '';
            });
        }
        // 清空用户的信息
        const clearReader = () => {
            localStorage.removeItem('reader');
        }
        return {
            reader, setReader, clearReader
        }
    },
    {
        persist: true
    }
)
