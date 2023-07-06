import React, { useContext } from "react";
import { Typography, Button } from "@material-tailwind/react";
import Charts from "./Charts";
import { AuthContext } from "./AuthProvider";

export default function Dashboard() {
  const { userData } = useContext(AuthContext);
  if (!userData) {
    return null;
  }
  return (
    <div className="mx-auto max-w-screen-xl p-2 lg:rounded lg:pl-6 my-16 border shadow-lg">
      <div>
        <div className="grid grid-cols-3 gap-10">
          <div className="flex flex-col">
            <Typography as="label" color="blue-gray" className="font-bold">
              Firstname
            </Typography>
            <Typography as="span">{userData.patientFirstname}</Typography>
          </div>
          <div className="flex flex-col">
            <Typography as="label" color="blue-gray" className="font-bold">
              Lastname
            </Typography>
            <Typography as="span">{userData.patientLastname}</Typography>
          </div>
          <div className="flex flex-col">
            <Typography as="label" color="blue-gray" className="font-bold">
              Date of Birth
            </Typography>
            <Typography as="span">{userData.dob}</Typography>
          </div>
          <div className="flex flex-col">
            <Typography as="label" color="blue-gray" className="font-bold">
              Gender
            </Typography>
            <Typography as="span">{userData.gender}</Typography>
          </div>
          <div className="flex flex-col">
            <Typography as="label" color="blue-gray" className="font-bold">
              Address
            </Typography>
            <Typography as="span">{userData.patientAddress}</Typography>
          </div>
          <div className="flex flex-col">
            <Typography as="label" color="blue-gray" className="font-bold">
              Email
            </Typography>
            <Typography as="span">{userData.patientEmail}</Typography>
          </div>
          <div className="flex flex-col">
            <Typography as="label" color="blue-gray" className="font-bold">
              Phone Number
            </Typography>
            <Typography as="span">{userData.patientPhoneNumber}</Typography>
          </div>
        </div>
        {/* <div className="flex gap-4 mt-4">
          <Button color="blue" ripple="light" className="rounded-md">
            Blood Group{" "}
            <span className="text-red-500 ml-4 font-extrabold">
              {userData.bloodGroup}
            </span>
          </Button>
          <Button color="blue" ripple="light" className="rounded-md">
            Genotype{" "}
            <span className="text-red-500 ml-4 font-extrabold">
              {userData.patientGenotype}
            </span>
          </Button>
          <Button color="blue" ripple="light" className="rounded-md">
            Current Medications
          </Button>
        </div> */}
        <Charts />
      </div>
    </div>
  );
}
