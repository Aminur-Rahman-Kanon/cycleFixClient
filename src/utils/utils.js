export const mockFetch = (stats) => {
    if (stats === 'success'){
        return Promise.resolve({
            json: () => Promise.resolve({
                status: 'success'
            })
        })
    }
    else if (stats === 'failed'){
        return Promise.reject( new Error('something went wrong') );
    }
}

export const mockLoginFetchApi = (cases) => {
    if (cases === 'success'){
        return Promise.resolve({
            json: () => Promise.resolve({
                status: 'success',
                data: {
                    email: "test16@test.com",
                    firstName: "test",
                    lastName: "16",
                    password: "$2b$10$qmwmZllSZ6GNmBWJSJFQCuksC4hijs8.RAvilw0gZL6HwqT0rFDWi",
                    user: "Male",
                    _id: "64a62be869bd9eacb3510a1b"
                }
            })
        })
    }
    else if (cases === 'failed'){
        return Promise.reject(new Error('something went wrong'));
    }
}

export const mockTestimonialApi = (stats) => {
    if (stats === 'success'){
        return Promise.resolve({
            json: () => Promise.resolve({
                status: 'success',
                data: [
                    {
                        comment: "hello this is a test comment",
                        email: "test1@test.com",
                        name: "test user1",
                        rating: 1,
                        _id: "63efaac07515e0c57243de61"
                    },
                    {
                        comment: "Great service, should go there again",
                        email: "test1@test.com",
                        name: "test user2",
                        rating: 2,
                        _id: "63efaac07515e0c57243de61"
                    },
                    {
                        comment: "Excellent service",
                        email: "test1@test.com",
                        name: "test user3",
                        rating: 3,
                        _id: "63efaac07515e0c57243de61"
                    },
                ]
            })
        })
    }
    else if (stats === 'failed'){
        return Promise.reject( new Error('failed') );
    }
}

export const sessionStorageMock = (() => {
    const storage = {
        
    }

    const setItem = (key, value) => {
        return storage[key] = value;
    }

    const getItem = (key) => {
        return storage[key];
    }

    const removeItem = (key) => {
        delete storage[key];
    }

    const clear = () => {
        storage = {};
    }

    return {
        setItem, getItem, removeItem, clear
    }
})()

export const mockLoginBar = {
    email: "test16@test.com",
    firstName: "test",
    lastName: "16",
    password: "$2b$10$qmwmZllSZ6GNmBWJSJFQCuksC4hijs8.RAvilw0gZL6HwqT0rFDWi",
    user: "Male",
    _id: "64a62be869bd9eacb3510a1b"
}

export const paymentUserData = {
    additionalCost: "0",
    bikeDetails: {make: 'vcc', model: 'cvcc', color: 'vc', additionalInfo: ''},
    date: "Thu Jul 27 2023",
    deposit: 25,
    due: 25,
    email: "test16@test.com",
    firstName: "testdfd",
    lastName: "16",
    packagePrice: "50",
    phone: "2323",
    service: "Safety Check",
    totalPrice: 50
}