let mode = 'none'

const GetAppMode = () => {
    if(mode == 'none'){
        // Get Mode
        const start = window.location.href.indexOf('#')
        const end = window.location.href.indexOf('&', start)
        if(start < 0){
            //Not found is main
            mode = 'main'
            return mode
        } else {
            const token = 
                end < 0 ? 
                    window.location.href.substr(start) : 
                    window.location.href.substr(start, end)
            switch (token) {
                case 'editor':
                    mode = 'editor'
                    break;
                default:
                    mode = 'main'
                    break;
            }
            return mode
        }
    } else{
        // Return Mode
        return mode
    }
}

export default GetAppMode