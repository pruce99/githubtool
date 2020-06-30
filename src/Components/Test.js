import React, { Component } from "react";
import "./CSS/Test.css";

export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      result: null,
      display: false,
      searchTerm: null,
      nexturl: null,
      prevurl: null,
      shownext: false,
      showprev: false,
      cars: null,
      searchway: "search user or all repositories",
      boo: false,
      xmark:false
    };
  }

  onInputChange(searchTerm) {
    this.setState({ searchTerm });
  }

  submitme = () => {
    this.saveResults(
      `https://api.github.com/users/${this.state.searchTerm}/repos`
    );
  };

  submitrepome = () => {
    this.saveResults(
      `https://api.github.com/search/repositories?q=${this.state.searchTerm}/`
      // `https://api.github.com/repos/${this.state.searchTerm}/testprivate`
      // `https://api.github.com/user/repos`
      // `https://api.github.com/search/issues?q=repo:${this.state.searchTerm}/testprivate type:issue`
    );
  };
  callmyrepo = () => {
    this.saveResults(`https://api.github.com/user/repos`);
  };

  deletetherepo = async elem => {
    const deleteurl = `https://api.github.com/repos/pruceuchihacodingmart/${elem}`;
    const headers = {
      Authorization: `Token 14d1ac599a26611475d39bfb9f7a44cc64052ff1`
    };
    const response = await fetch(deleteurl, {
      method: "DELETE",
      headers: headers
    });
    console.log(response);
    this.callmyrepo();
  };

  saveResults = async url => {
    // Axios.get(url).then((res)=>console.log(res))
    // const username = "pruceuchihacodingmart";
    // const password = "Icui4cui2cu";

    const headers = {
      Authorization: `Token 14d1ac599a26611475d39bfb9f7a44cc64052ff1`
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    const results = await response.json();
    console.log(results);
    if (this.state.boo) {
      console.log(this.state.boo);
      this.setState({ result: results.items, display: true });
    } else {
      // console.log(this.state.boo);
      this.setState({ result: results, display: true });
    }
    console.log(this.state.result);
    if (response.headers.get("link")) {
      const link = response.headers.get("link");
      const links = link.split(",");
      const urls = links.map(a => {
        return {
          url: a
            .split(";")[0]
            .replace(">", "")
            .replace("<", ""),
          title: a.split(";")[1]
        };
      });
      urls.forEach((u, index) => {
        if (index === 0) {
          this.setState({ nexturl: u.url, shownext: true });
        }
        if (index === 1) {
          this.setState({ prevurl: u.url, showprev: true });
        }
      });
    }
  };
  setValue = val => {
    if (val === "user") {
      this.setState({ searchway: val, boo: false,xmark:false  });
      this.setState({ result: null });
    } else if (val === "all github") {
      this.setState({ searchway: val, boo: true,xmark:false });
      this.setState({ result: null });
    } else if (val === "display my repo") {
      this.setState({ searchway: val, boo: false,xmark:true });
      this.callmyrepo();
    }
  };

  render() {
    return (
      <div>
        <div
          style={{ marginRight: "15px" , cursor: 'pointer' }}
          className="dropdown"
        >
          <button className="dropbtn">{this.state.searchway}</button>
          <div className="dropdown-content">
            {/* eslint-disable*/}
            <a onClick={() => this.setValue("user")}>user</a>
            <a onClick={() => this.setValue("all github")}>all github</a>
            <a onClick={() => this.setValue("display my repo")}>
              display my repo
            </a>
          </div>
        </div>
        <input
          style={{ marginRight: "15px" }}
          type="text"
          className="searchTerm"
          onChange={event => this.onInputChange(event.target.value)}
          placeholder="Search..."
        />
        <button
          className="buuo"
          onClick={this.state.boo ? this.submitrepome : this.submitme}
        >
          get results
        </button>
        <div>
          {this.state.display && this.state.result ? (
            <div className="box">
              {this.state.result.map((items, index) => {
                return (
                  <div className="card" key={index}>
                    <div 
                      className={this.state.xmark?"endtext":'none'}
                      onClick={() => this.deletetherepo(items.name)}
                    >
                      X
                    </div>
                    <a href={items.html_url}>{items.full_name}</a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <button
          onClick={() => this.saveResults(this.state.prevurl)}
          className={
            this.state.showprev && this.state.searchTerm ? "yes" : "none"
          }
        >
          prev
        </button>
        <button
          onClick={() => this.saveResults(this.state.nexturl)}
          className={
            this.state.shownext && this.state.searchTerm ? "yes" : "none"
          }
        >
          next
        </button>
      </div>
    );
  }
}
