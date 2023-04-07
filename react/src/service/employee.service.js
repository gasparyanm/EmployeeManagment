import axiosService from "./axios.service";

const listEmployee = (parentId) => {
    return new Promise((resolve, reject) => {
        axiosService.get(`/employees?parentId=${parentId}`)
            .then(response => {
                resolve(response.data.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const createEmployee = (payload) => {
    return new Promise((resolve, reject) => {
        axiosService.post(`/employees`, payload)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response.data);
            })
    })
}

const updateEmployee = (payload, employeeId) => {
    return new Promise((resolve, reject) => {
        axiosService.put(`/employees/${employeeId}`, payload)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response.data);
            })
    })
}

const deleteEmployee = (employeeId) => {
    return new Promise((resolve, reject) => {
        axiosService.delete(`/employees/${employeeId}`)
            .then(response => {
                resolve(response.data.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const getPositions = () => {
    return new Promise((resolve, reject) => {
        axiosService.get(`/employees/positions`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const getParentsByPosition = (position) => {
    return new Promise((resolve, reject) => {
        axiosService.get(`/employees/${position}/parents`)
            .then(response => {
                resolve(response.data.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}



export default {
    listEmployee,
    deleteEmployee,
    createEmployee,
    getPositions,
    getParentsByPosition,
    updateEmployee,
};