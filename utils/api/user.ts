import { Update } from "@material-ui/icons";
import { AxiosInstance } from "axios";
import { CreateUserDto, LoginDto, ResponseUser } from "./types";

export const UserApi = (instance: AxiosInstance) => ({
    async register(dto: CreateUserDto) {
        const { data } = await instance.post<CreateUserDto, { data: ResponseUser }>('/auth/register', dto);
        return data
    },
    async login(dto: LoginDto) {
        const { data } = await instance.post<LoginDto, { data: ResponseUser }>('/auth/login', dto);
        return data
    },
    async getUser() {
        const { data } = await instance.get<ResponseUser>('/users/me');
        return data
    },
    async getTargetUser(id: number) {
        const { data } = await instance.get<ResponseUser>(`/users/${id}`);
        return data
    },
    async getAll() {
        const { data } = await instance.get<ResponseUser[]>(`/users`);
        return data
    },
    async update(updateUserDto) {
        const { data } = await instance.patch(`/users/me`, updateUserDto);
        return data
    }
})
