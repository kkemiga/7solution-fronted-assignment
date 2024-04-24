import { Button, Divider, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { Title } = Typography;

import { chain, groupBy, orderBy } from "lodash";

// {
//     [Department]: {
//         "male": 1,                      // ---> Male Count Summary
//         "female": 1,                    // ---> Female Count Summary
//         "ageRange": "XX-XX",            // ---> Range
//         "hair": {                       // ---> "Color": Color Summary
//             "Black": 1,
//             "Blond": 1,
//             "Chestnut": 1,
//             "Brown": 1
//         },
//         "addressUser": {                // ---> "firstNamelastName": postalCode
//             "TerryMedhurst": "XXXXX",
//         }
//     }
// },
// ...

interface DepartmentDetail {
  male: number;
  female: number;
  ageRange: string;
  hair: object;
  addressUser: object;
}

export interface userModel {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: Address2;
  department: string;
  name: string;
  title: string;
}

export interface Address2 {
  address: string;
  city?: string;
  coordinates: Coordinates2;
  postalCode: string;
  state: string;
}

export interface Coordinates2 {
  lat: number;
  lng: number;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export default function Monitoring() {
  const router = useRouter();
  const [jsonData, setJsonData] = useState({});

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/users`);
      if (data?.users) {
        const departmentsOrder: any = orderBy(data.users, ["age"], ["asc"]);
        const departments = groupBy(departmentsOrder, "company.department");

        let departmentJson = Object.keys(departments).reduce(
          (objDep: any, department: any) => {
            const hair = { Black: 0, Blond: 0, Chestnut: 0, Brown: 0 };
            let addressUser: any = {};
            const detail = departments?.[department]?.reduce(
              (obj: any, user: userModel, index: number) => {
                if (user.gender === "male") {
                  obj.male = (obj.male || 0) + 1;
                } else obj.female = (obj.female || 0) + 1;

                switch (user.hair.color) {
                  case "Black":
                    hair.Black = (hair.Black || 0) + 1;
                    break;
                  case "Blond":
                    hair.Blond = (hair.Blond || 0) + 1;
                    break;
                  case "Chestnut":
                    hair.Chestnut = (hair.Chestnut || 0) + 1;
                    break;
                  case "Brown":
                    hair.Brown = (hair.Brown || 0) + 1;
                    break;
                  default:
                    "";
                }
                addressUser[`${user.firstName}${user.lastName}`] =
                  user.address.postalCode;

                return obj;
              },
              {}
            );
            objDep[department] = {
              ...detail,
              ageRange: `${departments?.[department][0]?.age}${
                (departments?.[department].length > 1 &&
                  `-${
                    departments?.[department][
                      departments?.[department].length - 1
                    ].age
                  }`) ||
                ""
              }`,
              hair,
              addressUser,
            };
            return objDep;
          },
          {}
        );
        console.log(departmentJson)
        setJsonData(departmentJson);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <Title level={3}>Department</Title>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      <Divider />
      <Button onClick={() => router.push("/")} type="primary">
        Back
      </Button>
    </div>
  );
}
