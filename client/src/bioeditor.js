import { Component } from "react";
export class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            draftBio: "",
            bio: "",
        };
        this.addBio = this.addBio.bind(this);
        this.inputUpdate = this.inputUpdate.bind(this);
    }

    inputUpdate({ target }) {
        this.setState(
            {
                draftBio: target.value,
            },
            () => {
                console.log("updated state: ", this.state);
            }
        );
    }
    addBio() {
        this.setState({ editMode: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("/draftbio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((resp) => {
                if (resp) {
                    this.setState({ editMode: false });
                    this.props.setBio(resp);
                }
            });
    }
    render() {
        return (
            <>
                {this.state.editMode && ( // is bio being edited --> if yes: this runs
                    <div>
                        <textarea
                            defaultValue={this.props.bio}
                            onChange={this.inputUpdate}
                        ></textarea>
                        <button
                            onClick={(e) => {
                                this.handleSubmit(e);
                            }}
                        >
                            save
                        </button>
                    </div>
                )}
                {!this.state.editMode && this.props.bio && ( // is there a bio already?--> if yes: this runs 
                    <div>
                        {this.props.bio}
                        <button onClick={this.addBio}>edit</button>
                    </div>
                )}
                {!this.state.editMode && !this.props.bio && ( // there is no editing and no saved bio --> this runs
                    <div>
                        No available bio, do you want to add this?
                        <button onClick={this.addBio}>Add</button>
                    </div>
                )}
            </>
        );
    }
}
