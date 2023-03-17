import type { NextPage } from "next";
import Head from "next/head";

import { FaUserAlt, FaCode } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";
import { MdEmail, MdPlace } from "react-icons/md";
import { SetStateAction, useEffect, useRef, useState } from "react";

import {skills, programs} from "./src/program_data.js"

function Home() {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [dropdownSearchValue, setDropdownSearchValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditMode(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [editMode]);

  const skillSelectionHandler = (skill: SetStateAction<string>) => {
    setSelectedSkill(skill);
    setDropdownSearchValue("");
    setEditMode(false);
  };

  const filteredSkills = skills.filter((skill) =>
    skill.match(new RegExp(dropdownSearchValue, "i"))
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>MIC Alumni Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Register section  */}
          <div className="w-3/5 p-5">
            <img className="h-16" src="/assets/sihlogo.png"></img>
            <div className="pt-0 pb-10">
              <h2 className="text-3xl font-bold text-indblue mb-2">
                Fill Your Details
              </h2>
              <div className="border-2 w-10 border-indblue inline-block mb-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                  <FaUserAlt className="text-gray-400 m-2" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your Full Name*"
                    className="bg-gray-100 outline-none text-sm flex-1 box-content"
                    required
                  />
                </div>

                {/* State selector starts */}
                <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                  <MdPlace className="text-gray-400 m-2" />
                  {editMode ? (
                    // display the dropdown when the input us focused
                    <div ref={dropdownRef} className="dropdown-wrapper">
                      <input
                        placeholder="Search for States/UTs"
                        className="dropdown-input text-sm pl-2 outline-indblue"
                        name="dropdown-input"
                        autoFocus
                        onChange={(e) => setDropdownSearchValue(e.target.value)}
                        value={dropdownSearchValue}
                      />

                      <div className="dropdown-list">
                        <ul className="bg-gray-100 mt-2 overflow-y-auto max-h-48 text-sm">
                          {filteredSkills.map((skill) => {
                            return (
                              <li
                                key={skill}
                                onClick={() => skillSelectionHandler(skill)}
                                className="p-2 text-sm hover:bg-indblue hover:text-white w-64"
                              >
                                {skill}{" "}
                              </li>
                            );
                          })}
                          {filteredSkills.length === 0 && (
                            <li className="no-result text-sm text-red-800 ">
                              No results found
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <input
                      className={`dropdown-search ${
                        !(dropdownSearchValue || selectedSkill) && "default"
                      } text-black bg-gray-100 w-64 text-sm flex items-center justify-between`}
                      onFocus={() => setEditMode(true)}
                      value={
                        selectedSkill ||
                        "Select your College State*               ▼"
                      }
                    />
                  )}
                </div>

                <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                  <HiAcademicCap className="text-gray-400 m-2" />
                  <input
                    type="text"
                    name="usercollege"
                    placeholder="Select your College*"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                  <FaCode className="text-gray-400 m-2" />
                  <input
                    type="text"
                    name="userpart"
                    placeholder="Participated in :*"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-72 p-2 flex items-center mb-3">
                  <MdEmail className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="useremail"
                    placeholder="Enter your Current Email Address*"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="flex w-64 mb-5 justify-between">
                  <label className="flex items-center text-xs"></label>
                  <a href="#" className="text-xs text-indblue">
                    Lost Your SIH Email
                  </a>
                </div>
                <a
                  href="#"
                  className="border-2 border-indblue text-indblue rounded-full px-12 py-2 inline-block font-semibold hover:bg-indblue hover:text-white"
                >
                  Next
                </a>
              </div>
            </div>
          </div>

          {/* Login section  */}
          <div className="w-2/5 bg-indblue text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2 ">Hello, SIH Alumni!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10 ">
              Now you know your Email Address! Login Here
            </p>
            <a
              href="#"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-indblue "
            >
              Sign in
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
