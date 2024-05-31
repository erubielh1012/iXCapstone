
const handleResponse = (data, onSuccess, onError) => {
    .then(blogs) => {
        
    }
}


const getBlogs = (onSuccess, onError) => {
    return new Promise((resolve, reject) => {

    })

    fetch("data in a url",{
        method: "GET",
        header: {
            "Content-Type": "application/json",
        },
    })
    .then((data) => {
        console.log("success");
        data
            .json()
            .then((blogs) => {
                onSuccess(blogs.data);
                console.log(blogs.message);
                // onSuccess();
        }).catch((error) => {
            onError(error);
        })
        onSuccess();
    })
    .catch((error) => {
        console.log("error");
        onError();
    })
}

useEffect (() => {
    blogService.
})