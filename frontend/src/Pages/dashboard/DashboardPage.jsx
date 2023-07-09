import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
function Dashboard1() {
  const [poidsParJour, setPoidsParJour] = useState(0);
  const [poidsParMois, setPoidsParMois] = useState(0);
  const [poidsParAnnee, setPoidsParAnnee] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [countBl, setCountBl] = useState("");
  const [SumCredit, setSumCredit] = useState("");
  const [sumEspece, setSumEspece] = useState("");
  const [sumCheque, setSumCheque] = useState("");
  const [sumTraite, setSumTraite] = useState("");
  const [kpiByDay, setKpiByDay] = useState("");

  const [uniqueCommercialCodes, setUniqueCommercialCodes] = useState([]);
  const [seriepie] = useState([44, 55, 41, 17, 15,13,10,5,1]);
  const [seriepie2] = useState([60, 30, 10, 60, 14,6,13,10,18]);
  const [seriepie3] = useState([80, 20, 25, 32, 13,5,3,5,20]);
  const [entete, setEntete] = useState([]);
  const [produit, setProduit] = useState([]);
  const [gammes, setGammes] = useState([]);
  const [ligneCommercial, setLigneCommercial] = useState([]);
  const [commercialWithGamme, setCommercialWithGamme] = useState([]);
  const [paiement, setPaiement] = useState([]);
  const [optionpie] = useState({
    chart: {
      type: 'donut',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });
  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  const serie= [
    {
    name: 'Frero',
    color:"rgb(225, 14, 14)",
    data: [44, 55, 41, 37, 22, 43, 21]
  }, {
    name: 'Haribo',
    color:" rgb(215, 131, 221)",
    data: [53, 32, 33, 52, 13, 43, 32]
  }, {
    name: 'Nestle',
    color:"rgb(106, 227, 236)",
    data: [12, 17, 11, 9, 15, 11, 20]
  }, {
    name: 'Rani',
    color:"rgb(25, 85, 225)",
    data: [9, 7, 5, 8, 6, 9, 4]
  }, {
    name: 'Sultan',
    color:"rgb(6, 111, 8)",
    data: [25, 12, 19, 32, 25, 24, 10]
  },
  {
    name: 'Perferetti',
    color:"rgb(92, 44, 5)",
    data: [9, 7, 5, 8, 6, 9, 4]
  },{
    name: 'Ulker',
    color:"rgb(238, 140, 129)",
    data: [9, 7, 5, 8, 6, 9, 4]
  },{
    name: 'Café elloze',
color:"rgb(34, 164, 25)",
    data: [9, 7, 5, 8, 6, 9, 4]
  },];
  const [optionBarr,setOptionsbar]=useState({
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: ['V7','V6','V5','V4','V3','V2','C6','C7'],
      labels: {
              formatter: function (val) {
                return val 
              }
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val 
              }
            }
          },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX:40
    }
  });
  const [optionBar,setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: [2022,2021,2020,2019,2018],
      labels: {
              formatter: function (val) {
                return val 
              }
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val 
              }
            }
          },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  });
 const [option, setOption] = useState(
  {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        total: {
          enabled: true,
          offsetX: 0,
          style: {
            fontSize: '13px',
            fontWeight: 900
          }
        }
      }
    },
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  xaxis: {
    categories: ["commercial code"],
    labels: {
      formatter: function (val) {
        return "1";
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "1";
      }
    },
    x: {
      formatter: function (val) {
        return "1";
      }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetX: 40
  }
});



useEffect(() => {
  // Update the option state with the updated values
  const updatedOption = { ...option }; // Create a copy of the option object
  updatedOption.xaxis.categories = entete.map((item) => item.commercial_code);

 

  setOption(updatedOption);
}, [produit,entete]);
  // const serie = marquedata.map((marque) => ({
  //   name: marque.libelle,
  //   data: marque.data
  // }));
  // const option = {
  //   chart: {
  //     type: 'bar',
  //     height: 350,
  //     stacked: true,
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //       dataLabels: {
  //         total: {
  //           enabled: true,
  //           offsetX: 0,
  //           style: {
  //             fontSize: '13px',
  //             fontWeight: 900
  //           }
  //         }
  //       }
  //     },
  //   },
  //   stroke: {
  //     width: 1,
  //     colors: ['#fff']
  //   },
  //   xaxis: {
  //     categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
  //     labels: {
  //       formatter: function (val) {
  //         return val + "K"
  //       }
  //     }
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: function (val) {
  //         return val + "K"
  //       }
  //     }
  //   },
  //   fill: {
  //     opacity: 1
  //   },
  //   legend: {
  //     position: 'top',
  //     horizontalAlign: 'left',
  //     offsetX: 40
  //   }
  // };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseParJour = await axios.get(
          "http://localhost:5000/api/v1/statistique/parJour"
        );
        setPoidsParJour(responseParJour.data);

        const responseParMois = await axios.get(
          "http://localhost:5000/api/v1/statistique/parMois"
        );
        setPoidsParMois(responseParMois.data);

        const responseParAnnee = await axios.get(
          "http://localhost:5000/api/v1/statistique/parAnnee"
        );
        setPoidsParAnnee(responseParAnnee.data);
        const responseSomBl = await axios.get(
          "http://localhost:5000/api/v1/statistique/Bls"
        );
        setCountBl(responseSomBl.data);
        const responseSumCredit = await axios.get(
          "http://localhost:5000/api/v1/statistique/SumCredit"
        );
        setSumCredit(responseSumCredit.data);
        const responseSumEspece = await axios.get(
          "http://localhost:5000/api/v1/statistique/SumEspece"
        );
        setSumEspece(responseSumEspece.data);
        const responseSumCheque = await axios.get(
          "http://localhost:5000/api/v1/statistique/SumCheque"
        );
        setSumCheque(responseSumCheque.data);
        const responseSumTraite = await axios.get(
          "http://localhost:5000/api/v1/statistique/SumTraite"
        );
        setSumTraite(responseSumTraite.data);

        const currentDate = new Date();
        const monthOptions = { month: "long" };
        setCurrentMonth(
          currentDate
            .toLocaleString("default", monthOptions)
            .charAt(0)
            .toUpperCase() +
            currentDate.toLocaleString("default", monthOptions).slice(1)
        );
        setCurrentYear(currentDate.getFullYear().toString());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    console.log("by day", poidsParJour);
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données de l'API avec Axios
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/gamme/");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  

  const optionpies = {
    chart: {
      type: 'donut',
    },
    labels: data.map(item => item.libelle), // Supposons que chaque objet dans la réponse de l'API a une propriété 'gamme'
    colors: data.map(item => item.color), // Supposons que chaque objet dans la réponse de l'API a une propriété 'couleur'
  };
   const [marqueData, setMarqueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/marque/');
        setMarqueData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


 
  // const [optionBarr, setOptionss] = useState({
  //   chart: {
  //     type: 'bar',
  //     height: 350,
  //     stacked: true,
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //       dataLabels: {
  //         total: {
  //           enabled: true,
  //           offsetX: 0,
  //           style: {
  //             fontSize: '13px',
  //             fontWeight: 900,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   stroke: {
  //     width: 1,
  //     colors: ['#fff'],
  //   },
  //   xaxis: {
  //     categories: [],
  //     labels: {
  //       formatter: function (val) {
  //         return val;
  //       },
  //     },
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: function (val) {
  //         return val;
  //       },
  //     },
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //   legend: {
  //     position: 'top',
  //     horizontalAlign: 'left',
  //     offsetX: 40,
  //   },
  // });
  
  // const [seriess, setSeriess] = useState([]);
  const seriess= [
    {
    name: 'Frero',
    color:"rgb(225, 14, 14)",
    data: [20, 40,15, 60, 10, 25, 70]
  }, {
    name: 'Haribo',
    color:" rgb(215, 131, 221)",
    data: [150, 10, 43, 62, 23, 63, 44]
  }, {
    name: 'Nestle',
    color:"rgb(106, 227, 236)",
    data: [50, 120, 90, 50, 24, 30, 60]
  }, {
    name: 'Rani',
    color:"rgb(25, 85, 225)",
    data: [20, 75, 59, 87, 16, 79, 94]
  }, {
    name: 'Sultan',
    color:"rgb(6, 111, 8)",
    data: [60, 10, 41, 40, 80, 10, 70]
  },
  {
    name: 'Perferetti',
    color:"rgb(92, 44, 5)",
    data: [4, 3,10, 12, 16, 19, 54]
  },{
    name: 'Ulker',
    color:"rgb(238, 140, 129)",
    data: [50, 17, 55, 28, 76, 19, 34]
  },{
    name: 'Café elloze',
color:"rgb(34, 164, 25)",
    data: [22, 71, 51, 84, 67, 19, 14]
  },];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEntete = await axios.get("http://localhost:5000/api/v1/Entete/");
        const enteteData = responseEntete.data;
        setEntete(enteteData);
        setUniqueCommercialCodes([...new Set(entete.map((commercial) => commercial.commercial_code))]);
  
        const responseProduit = await axios.get("http://localhost:5000/api/v1/produit/");
        setProduit(responseProduit.data);
  
        const responseGammes = await axios.get("http://localhost:5000/api/v1/gamme/");
        setGammes(responseGammes.data);
  
        const responseLigneCommercial = await axios.get("http://localhost:5000/api/v1/Ligne/");
        setLigneCommercial(responseLigneCommercial.data);
  
        const responseBL = await axios.get("http://localhost:5000/api/v1/BL");
        setPaiement(responseBL.data);
  
        // Process the data and create the commercialWithGamme array
        const commercialWithGammeData = enteteData.map((enteteItem) => {
          const ligneItems = ligneCommercial.filter(l => l.entetecommercial_code === enteteItem.commercial_code);
          const produitItems = produit.filter((p) => ligneItems.some((l) => l.produit_code === p.code));
          const gammeItems = gammes.filter((g) => produitItems.some((p) => p.gamme_code === g.code));
  console.log("ligneCommercial",ligneCommercial);

          return {
            commercial_code: enteteItem.commercial_code,
            gammes: gammeItems,
            quantite: ligneItems.map((l) => l.quantite),
          };
        });
  
        // Set the state with the commercialWithGamme data
        // const uniqueCommercialCodes = [...new Set(enteteData.map((commercial) => commercial.commercial_code))];
        // setOptionss((prevOptions) => ({
        //   ...prevOptions,
        //   xaxis: {
        //     ...prevOptions.xaxis,
        //     categories: uniqueCommercialCodes,
        //   },
        // }));
        // setSeriess(
        //   commercialWithGammeData.map((item) => ({
        //     name: item.gammes.map((g) => g.libelle),
        //     color: item.gammes.map((g) => g.color),
        //     data: item.quantite.flat(),
        //   }))
        // );
  
        // Set the state with the commercialWithGamme data
        setCommercialWithGamme(commercialWithGammeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <div>
      <div className="row layout-top-spacing">
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-header">
                <div className="w-info">
                  <h6 className="value">Poids par jour</h6>
                </div>
                <div className="task-action">
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="pendingTask"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                    <span>Lundi</span>{" "}
                    </a>

                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="pendingTask"
                      style={{ willChange: "transform" }}
                    >
                      <a
                        className="dropdown-item"
                        href={{ javascript: void 0 }}
                      >
                        Today
                      </a>
                      <a
                        className="dropdown-item"
                        href={{ javascript: void 0 }}
                      >
                        Yesterday
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-content">
                <div className="w-info">
                  <p className="value" style={{color:"#387feb"}}>
                    {" "}
                    {poidsParJour}
                   
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trending-up"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </p>
                </div>
              </div>

              <div className="w-progress-stats">
                <div className="progress" style={{backgroundColor:"#f0f2f5"}}>
                <div
                className="progress-bar bg-gradient-primary"
                role="progressbar"   
                style={{ width: "1%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
                </div>

                <div className="">
                  <div className="w-icon">{/* <p>57%</p> */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-header">
                <div className="w-info">
                  <h6 className="value">Poids par mois</h6>
                </div>
                <div className="task-action">
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="pendingTask"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                    <span>{currentMonth}</span>{" "}
                    </a>

                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="pendingTask"
                      style={{ willChange: "transform" }}
                    >
                      <a
                        className="dropdown-item"
                        href={{ javascript: void 0 }}
                      >
                        This month
                      </a>
                      <a
                        className="dropdown-item"
                        href={{ javascript: void 0 }}
                      >
                        Last month
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-content">
                <div className="w-info">
                  <p className="value" style={{color:"#387feb"}}>
                    {poidsParMois}
                    
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trending-up"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </p>
                </div>
              </div>
              <div className="w-progress-stats">
                <div className="progress" style={{backgroundColor:"#f0f2f5"}}>
                <div
                className="progress-bar bg-gradient-primary"
                role="progressbar"   
                style={{ width: "1%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
                </div>

                <div className="">
                  <div className="w-icon">{/* <p>57%</p> */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-header">
                <div className="w-info">
                  <h6 className="value">Poids par année</h6>
                </div>
                <div className="task-action">
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="pendingTask"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                    <span>{currentYear}</span>{" "}
                    </a>

                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="pendingTask"
                      style={{ willChange: "transform" }}
                    >
                      <a
                        className="dropdown-item"
                        href={{ javascript: void 0 }}
                      >
                        This year
                      </a>
                      <a
                        className="dropdown-item"
                        href={{ javascript: void 0 }}
                      >
                        Last year
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-content">
                <div className="w-info">
                  <p className="value" style={{color:"#387feb"}}>
                    {poidsParAnnee}
                   
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trending-up"
                    >
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </p>
                </div>
              </div>

              <div className="w-progress-stats">
                <div className="progress" style={{backgroundColor:"#f0f2f5"}}>
                <div
                className="progress-bar bg-gradient-primary"
                role="progressbar"   
                style={{ width: "90%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
                </div>

                <div className="">
                  <div className="w-icon">{/* <p>57%</p> */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-header">
                <div className="w-info">
                  <h6 className="value">BL</h6>
                </div>
                <div className="task-action">
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="pendingTask"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                    <p>2023</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-content">
                <div className="w-info">
                  <p className="value" style={{color:"#387feb"}}>
                    {countBl}
                   
                  </p>
                </div>
              </div>

              <div className="w-progress-stats">
                <div className="progress" style={{backgroundColor:"#f0f2f5"}}>
                <div
                className="progress-bar bg-gradient-primary"
                role="progressbar"   
                style={{ width: "15%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
                </div>

                <div className="">
                  <div className="w-icon">{/* <p>57%</p> */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-account-invoice-two">
            <div className="widget-content">
              <div className="account-box">
                <div className="info" style={{height:"87px"}}>
            
                  
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-header">
                <div className="w-info">
                  <h6 className="value">credit</h6>
                </div>
                <div className="task-action">
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="pendingTask"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                    <p>2023</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-content">
                <div className="w-info">
                  <p className="value" style={{color:"#387feb"}}>
                    {SumCredit}
              
                  </p>
                </div>
              </div>

              <div className="w-progress-stats">
                <div className="progress" style={{backgroundColor:"#f0f2f5"}}>
                <div
                className="progress-bar bg-gradient-primary"
                role="progressbar"   
                style={{ width: "0%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
                </div>

                <div className="">
                  <div className="w-icon">{/* <p>57%</p> */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-header">
                <div className="w-info">
                  <h6 className="value" >Especes</h6>
                </div>
                <div className="task-action">
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="pendingTask"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                    <p>2023</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-content">
                <div className="w-info">
                  <p className="value" style={{color:"#387feb"}}>
                    {sumEspece}{" "}
                  </p>
                </div>
              </div>

              <div className="w-progress-stats">
                <div className="progress" style={{backgroundColor:"#f0f2f5"}}>
                <div
                className="progress-bar bg-gradient-primary"
                role="progressbar"   
                style={{ width: "100%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
                </div>

                {/* <div className="">
                  <div className="w-icon">
                    <p>57%</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-header">
                <div className="w-info">
                  <h6 className="value">Chéque</h6>
                </div>
                <div className="task-action">
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="pendingTask"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                    <p>2023</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-content">
                <div className="w-info">
                  <p className="value" style={{color:"#387feb"}}>
                    {sumCheque}{" "}
                  </p>
                </div>
              </div>

              <div className="w-progress-stats">
                <div className="progress" style={{backgroundColor:"#f0f2f5"}}>
                <div
                className="progress-bar bg-gradient-primary"
                role="progressbar"   
                style={{ width: "30%" }}
                aria-valuenow="90"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
                </div>

                {/* <div className="">
                  <div className="w-icon">
                    <p>57%</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
          <div className="widget widget-card-four">
            <div className="widget-content">
              <div className="w-header">
                <div className="w-info">
                  <h6 className="value">Traite</h6>
                </div>
                <div className="task-action">
                  <div className="dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      role="button"
                      id="pendingTask"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                     <p>2023</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-content">
                <div className="w-info">
                  <p className="value" style={{color:"#387feb"}}>
                    {sumTraite}{" "}
                  </p>
                </div>
              </div>

              <div className="w-progress-stats" >
                <div className="progress" style={{backgroundColor:"#f0f2f5"}}>
                  <div
                    className="progress-bar bg-gradient-primary"
                    role="progressbar"   
                    style={{ width: "65%" }}
                    aria-valuenow="90"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>

                
        
                </div>

                {/* <div className="">
                  <div className="w-icon">
                    <p>57%</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <div class="widget-content widget-content-area">
          <div className="table-responsive">
            <table className="table table-bordered mb-4">
              <thead>
                <tr>
                    
                  <th>Commercial</th>
                  <th>Vente</th>
                  <th>NB/BL</th>
                  <th >Credit</th>
                  <th>Debut</th>
                  <th>Poids</th>
                  <th>Rec</th>
                  <th>NB/Visites</th>
                  <th>Tx Succées</th>
                  <th>DLC %</th>
                </tr>
              </thead>
              <tbody>
                {uniqueCommercialCodes.map((commercial) => {
                  const filteredEntete = entete.filter(
                    (item) => item.commercial_code === commercial
                  );
                  const totalNetAPayee = filteredEntete.reduce(
                    (total, item) => total + item.net_a_payer,
                    0
                  );
                  const countEntete = filteredEntete.length;
                  //------------------------------------
                  const filteredPaiment = paiement.filter(
                    (item) => item.commercial_code === commercial
                  );
                  const countPaiement = filteredPaiment.length;

                  return (
                    <tr key={commercial}>
                      <td>{commercial}</td>
                      <td>{totalNetAPayee}</td>
                      <td>{countEntete}</td>
                      <td>{countPaiement}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div> */}
        {/* bar charts  */}
    <br/>
    <div className="card component-card_1" style={{maxWidth:"1820px",marginLeft:"15px"}}>
    <div className="card-body" >
        <div id="chart" >
          <h5 style={{textAlign:"center"}}>Vente par Marques</h5>
      <ReactApexChart options={optionBar} series={serie} type="bar" height={450} width={1590}/>
    </div>
    </div>
    </div>
    <div className="card component-card_1" style={{maxWidth:"1820px",marginLeft:"15px"}}>
    <div className="card-body" >
        <div id="chart" >
          <h5 style={{textAlign:"center"}}>Vente par Commercial/Gammes</h5>
        
          <ReactApexChart options={optionBarr} series={seriess} type="bar" height={450} width={1590} />
    </div>
    </div>
    </div>
        {/* end var charts  */}
       {/* <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing" style={{marginTop:"25px"}}>
          <div className="widget widget-chart-three">
            <div className="widget-heading">
              <div className="">
                <h5 className="">Unique Visitors</h5>
              </div>

              <div className="dropdown ">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="uniqueVisitors"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-more-horizontal"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </a>

                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="uniqueVisitors"
                >
                  <a className="dropdown-item" href={{ javascript: void 0 }}>
                    View
                  </a>
                  <a className="dropdown-item" href={{ javascript: void 0 }}>
                    Update
                  </a>
                  <a className="dropdown-item" href={{ javascript: void 0 }}>
                    Download
                  </a>
                </div>
              </div>
            </div>

            <div className="widget-content">
              <div id="uniqueVisits"></div>
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
              />
            </div>
          </div>
        </div>*/}

      </div>
     
      <div style={{ display: "flex", justifyContent: "space-between" }}>
  <div class="card component-card_1" style={{ width: "32%" }}>
    <div class="card-body">
      <div id="chart">
      <h6 style={{textAlign:"center"}}>Ventes par gamme Aujord'hui</h6>
        <ReactApexChart options={optionpies} series={seriepie} type="donut" />
      </div>
    </div>
  </div>
  <div class="card component-card_1" style={{ width: "32%" }}>
    <div class="card-body">
    <div id="chart">
      <h6 style={{textAlign:"center"}}>Ventes par gamme Mois Mai</h6>
        <ReactApexChart options={optionpies} series={seriepie2} type="donut" />
      </div>
    </div>
  </div>
  <div class="card component-card_1" style={{ width: "32%" }}>
    <div class="card-body">
    <div id="chart">
      <h6 style={{textAlign:"center"}}>Ventes par gamme année 2023</h6>
        <ReactApexChart options={optionpies} series={seriepie3} type="donut" />
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
export default Dashboard1;
