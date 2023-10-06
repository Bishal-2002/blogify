import './style.scss'

const PageNotFound = ({message='404! Page not found!'}) => {
    return (
        <h1 id='errorHeading404'>{message}</h1>
    )
}

export default PageNotFound