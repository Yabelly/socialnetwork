import { Component } from "react";

export class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.state.profilePic);
        fetch("/upload", {
            method: "POST",
            body: fd,
        })
            .then((resp) => resp.json())
            .then((resp) => {
                console.log("resp from upload: ", resp);
                this.setState({ profilePic: resp.profile_pic });
                this.props.updateProfilePic(resp.profile_pic);
                this.props.hideUploader();
            })
            .catch((err) => {
                console.log("error in upload profilepicture: ", err);
            });

        // 2. Create a new form data instance
        // 3. Append your file to it (use the value you stored int the state)
        // 4. Send data over to the server with a fetch request
        // 5. If the request is successful update the profilePic
        // property form the state of App (use the updateProfilePic method)
    }

    render() {
        return (
            <div id={"uploader"}>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="profilePic"
                        type={"file"}
                        accept="image/*"
                        onChange={this.handleChange}
                    />
                    <button>Upload</button>
                </form>
                <div className="close" onClick={this.props.hideUploader}>
                    close
                </div>
            </div>
        );
    }
}
