import {defineStore} from "pinia";
import {reactive} from 'vue';

/**
 * 保存登录时用户的信息
 */
export const useReaderStore = defineStore('reader', () => {
        let reader = reactive({
            id: '',
            username: '',
            nickname: '',
            gender: '',
            age: '',
            tel: '',
            token: ''
        });
        const setReader = (data) => {
            Object.keys(reader).forEach(key => {
                reader[key] = data[key] || '';
            });
        }

        const clearReader = () => {
            Object.keys(reader).forEach(key => {
                reader[key] = '';
            });
        }
        return {
            reader, setReader, clearReader
        }
    },
    {
        persist: true
    }
)
