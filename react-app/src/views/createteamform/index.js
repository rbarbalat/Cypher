import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkCreateTeam } from "../../store/teams";
import StepOne from "./stepone";
import StepTwo from "./steptwo";
import StepThree from "./stepthree";
import StepFour from "./stepfour";
import "./createteamform.css";
import Input from "../../components/inputs/input"

function CreateTeamForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleStep = (num) => {
    history.push(`/create-team/new/${num}`);
  };

  const handleCreateTeam = async (e) => {
    console.log("inside create team")
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("image", image)
    const newTeam = formData;
    const data = await dispatch(thunkCreateTeam(newTeam));
    // if (data.error) {
    //   console.log(data.error);
    // } else {
    //   history.push(`/dashboard`);
    // }
    if(data) history.push("/dashboard")
  };

  return (
    <main id="create_team_form--wrapper">
      <div className="create_team_form--navigation"></div>
      <div className="create_team_form--main">
        <div className="create_team_form--aside">
          <header className="create_team_form--header">
            <span>{name}</span>
          </header>
        </div>
        <form
          // action="/api/teams/"
          // method="POST"
          onSubmit={handleCreateTeam}
          encType="multipart/form-data"
        >
          <Input
            placeholder="Ex: Acme Marketing or Acme"
            value={name}
            setValue={(x) => setName(x.target.value)}
            name="name"
            error={undefined}
            disabled={false}
          />
          <Input
            placeholder="Ex: Q4 budget, autumn campaign"
            value={description}
            setValue={(x) => setDescription(x.target.value)}
            name="description"
            error={undefined}
            disabled={false}
          />
         <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          <button className="create_form_step--next">Finish</button>
        </form>
        {/* <div className='create_team_form--step'>
                    <Switch>
                        <Route exact path="/create-team/new/1" >
                            <StepOne handleStep={handleStep} name={name} setName={setName}/>
                        </Route>
                        <Route exact path="/create-team/new/2">
                            <StepTwo handleStep={handleStep} description={description} setDescription={setDescription}/>
                        </Route>
                        <Route exact path="/create-team/new/3">
                            <StepThree handleStep={handleStep} image={image} setImage={setImage} />
                        </Route>
                        <Route exact path="/create-team/new/4">
                            <StepFour handleCreateTeam={handleCreateTeam} handleStep={handleStep} name={name} />
                        </Route>
                    </Switch>
          </div> */}
      </div>
    </main>
  );
}

export default CreateTeamForm;
