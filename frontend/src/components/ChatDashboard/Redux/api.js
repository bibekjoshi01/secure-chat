import { axiosInstance } from "@/utils/axios";

export const roomInfo = (roomId) => {
    return axiosInstance.get(`api/room/info/${roomId}`);
}

