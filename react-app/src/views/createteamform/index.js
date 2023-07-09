import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkCreateTeam } from "../../store/teams";
import "./createteamform.css";
import Input from "../../components/inputs/input"
import { FaArrowLeft, FaRegTimesCircle } from "react-icons/fa";

function CreateTeamForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(undefined);
  const [imagePreview, setImagePreview ] = useState(undefined)
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const handleImage = (e) => {
    setImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  };

  console.log(image)

  const handleCreateTeam = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("image", image)
    const newTeam = formData;
    const data = await dispatch(thunkCreateTeam(newTeam));
    if (data.errors) {
      const keys = Object.keys(data.errors);
      const vals = Object.values(data.errors);
      const valErrors = {};
      //each val is an array of length 1
      for(let i = 0; i<keys.length; i++)
      {
        valErrors[keys[i]] = vals[i][0]
      }
      setErrors(valErrors);
      return;
    } else {
      history.push(`/dashboard`);
    }
  };

  const handleToDashboard = () => {
    history.push('/dashboard')
  }

  return (
    <main id="create_team_form--wrapper">
      <div className="create_team_form--navigation">
        <div onClick={handleToDashboard} className="create_team_form--back">
          <FaArrowLeft/>
          <span>Back to Dashboard</span>
        </div>
      </div>
      <div className="create_team_form--main">
        <div className="create_team_form--aside">
          <header className="create_team_form--header">
            <span>{name}</span>
          </header>
        </div>
        <div className="create_team_form--contents">
          <h1>Create New Team ✨</h1>
        <form onSubmit={handleCreateTeam} encType="multipart/form-data">
          <div className="create_team_form--input">
            <p><strong>What's the name of your team or organization?</strong><br/>
            This will the name of your Cypher team -- choose something that your team will recognize.</p>
            <Input
              placeholder="Ex: Acme Marketing or Acme"
              value={name}
              setValue={(x) => setName(x.target.value)}
              name="name"
              error={errors.name}
              disabled={false}
            />
          </div>
          <div className="create_team_form--input">
          <p><strong>Describe what your team is working on now.</strong><br/>This could be anything: a project, campaign, event, or the deal you’re trying to close.</p>
          <Input
            placeholder="Ex: Q4 budget, autumn campaign"
            value={description}
            setValue={(x) => setDescription(x.target.value)}
            name="description"
            error={errors.description}
            disabled={false}
          />
          </div>
          <div className="create_team_form--image">
          <label  className="create_team_form--image_label">Team Image</label>
          {imagePreview ? <div className="create_team_form--preview" style={{backgroundImage: `url(${imagePreview})`}}></div> : null }
          <div className="create_team_form--span">
            <label  className="create_team_form--image_button" htmlFor="team-image">Upload Image</label>
            { image ? <span>{image.name}</span> : <span>No file chosen</span>}
            <input id="team-image" type="file" accept="image/*"
                onChange={(e) => handleImage(e)}
              />
          </div>
          {errors.image &&
            <span  className="create_team_form--error">
              <FaRegTimesCircle className='error-icon'/>
              <small>{errors.image}</small>
            </span>
          }
          </div>


          <div className="create_team_form--actions">
          <button className="create_form_step--next">Finish</button>
          </div>
        </form>
        </div>
      </div>
    </main>
  );
}

export default CreateTeamForm;
