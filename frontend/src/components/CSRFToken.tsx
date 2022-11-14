import getCookie from "../cookie/cookie";
const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={getCookie('csrftoken')} />
    );
};

export default CSRFToken;