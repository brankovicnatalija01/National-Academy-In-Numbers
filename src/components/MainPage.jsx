import { useState, useLayoutEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import { TableHead } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { Chart } from "react-google-charts";
import logo from "./logo.png";
import StarRatings from "react-star-ratings";
import { Tabs, Tab, Box } from "@mui/material";
import { GiTeacher } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa6";
import CountUp from "react-countup";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa6";
import { useMediaQuery } from "@mui/system";
import Footer2 from "./Footer";
import "./styles.css";

MainPage.propTypes = {
  data: PropTypes.array.isRequired,
};

function MainPage({ data }) {
  const [tabValue, setTabValue] = useState(0);
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedTematskaOblast, setSelectedTematskaOblast] = useState(null);
  const [selectedTipObuke, setSelectedTipObuke] = useState(null);
  const [selectedLokacija, setSelectedLokacija] = useState(null);

  // Extract options for each filter
  const programOptions = Array.from(
    new Set(data.map((item) => item.PROGRAMNAJU))
  );
  const tematskaOblastOptions = Array.from(
    new Set(data.map((item) => item["TEMATSKA OBLASTNAJU"]))
  );
  const tipObukeOptions = Array.from(
    new Set(data.map((item) => item["Tip obuke"]))
  );
  const lokacijaOptions = Array.from(
    new Set(data.map((item) => item.Lokacija))
  );

  // Filter data based on all selected filters
  const filteredData = data.filter((item) => {
    return (
      (!selectedProgram || item.PROGRAMNAJU === selectedProgram) &&
      (!selectedTematskaOblast ||
        item["TEMATSKA OBLASTNAJU"] === selectedTematskaOblast) &&
      (!selectedTipObuke || item["Tip obuke"] === selectedTipObuke) &&
      (!selectedLokacija || item.Lokacija === selectedLokacija)
    );
  });

  function calculateTotalParticipantsByYear(filteredData) {
    const totalParticipantsByYear = {};

    filteredData.forEach((item) => {
      const year = item["Godina realizacije"];
      const numParticipants = parseInt(item["Broj polaznika"], 10);

      // Provera da li je 'Godina realizacije' validna
      if (year && !isNaN(year) && !isNaN(numParticipants)) {
        if (year in totalParticipantsByYear) {
          totalParticipantsByYear[year] += numParticipants;
        } else {
          totalParticipantsByYear[year] = numParticipants;
        }
      }
    });

    return totalParticipantsByYear;
  }

  function calculateTotalDaysByYear(filteredData) {
    const totalDaysByYear = {};

    filteredData.forEach((item) => {
      const year = item["Godina realizacije"];
      const numDays = parseInt(item["Broj realizovanih dana"], 10);

      // Provera da li je 'Godina realizacije' validna
      if (year && !isNaN(year) && !isNaN(numDays)) {
        if (year in totalDaysByYear) {
          totalDaysByYear[year] += numDays;
        } else {
          totalDaysByYear[year] = numDays;
        }
      }
    });

    return totalDaysByYear;
  }

  function calculateTotalNumberOfTrainingsByYear(filteredData) {
    const totalNumberOfProgramsByYear = {};

    filteredData.forEach((item) => {
      const year = item["Godina realizacije"];

      // Provera da li je 'Godina realizacije' validna i nije 2024
      if (year && !isNaN(year)) {
        // Ako već postoji unos za tu godinu, povećaj broj programa za tu godinu za 1
        if (year in totalNumberOfProgramsByYear) {
          totalNumberOfProgramsByYear[year]++;
        } else {
          // Inače, postavi broj programa za tu godinu na 1
          totalNumberOfProgramsByYear[year] = 1;
        }
      }
    });

    return totalNumberOfProgramsByYear;
  }
  function calculateAverageEvaluationByYear(filteredData) {
    const averageEvaluationByYear = {};

    filteredData.forEach((item) => {
      const year = item["Godina realizacije"];
      const evaluation = item["Evaluacija opšta ocena"];

      if (year && !isNaN(year) && evaluation) {
        const evaluationValue = parseFloat(evaluation.replace(",", ".").trim());
        if (!isNaN(evaluationValue) && evaluationValue !== 0) {
          if (year in averageEvaluationByYear) {
            averageEvaluationByYear[year].push(evaluationValue);
          } else {
            averageEvaluationByYear[year] = [evaluationValue];
          }
        }
      }
    });

    for (const year in averageEvaluationByYear) {
      const evaluations = averageEvaluationByYear[year];
      const validEvaluations = evaluations.filter(
        (evaluation) => !isNaN(evaluation)
      );
      if (validEvaluations.length > 0) {
        const sum = validEvaluations.reduce(
          (total, evaluation) => total + evaluation,
          0
        );
        const average = sum / validEvaluations.length;
        averageEvaluationByYear[year] = average.toFixed(2); // Zaokružuje prosečnu ocenu na dve decimale
      }
    }

    return averageEvaluationByYear;
  }

  const totalNumberOfTrainingsByYear =
    calculateTotalNumberOfTrainingsByYear(filteredData);
  const totalParticipantsByYear =
    calculateTotalParticipantsByYear(filteredData);
  const totalDaysByYear = calculateTotalDaysByYear(filteredData);
  const averageEvaluationsByYear =
    calculateAverageEvaluationByYear(filteredData);

  const years = Object.keys(totalParticipantsByYear);
  const totalTrainings = Object.values(totalNumberOfTrainingsByYear);
  const participants = Object.values(totalParticipantsByYear);
  const totalDays = Object.values(totalDaysByYear);
  const averageEvaluation = Object.values(averageEvaluationsByYear).map(
    parseFloat
  );

  const totalTrainingsChartData = [["Godina", "Broj realizovanih obuka"]];
  for (let i = 0; i < years.length; i++) {
    totalTrainingsChartData.push([years[i], totalTrainings[i]]);
  }

  const participantsChartData = [["Godina", "Broj polaznika"]];
  for (let i = 0; i < years.length; i++) {
    participantsChartData.push([years[i], participants[i]]);
  }

  const totalDaysChartData = [["Godina", "Broj realizovanih dana"]];
  for (let i = 0; i < years.length; i++) {
    totalDaysChartData.push([years[i], totalDays[i]]);
  }

  const averageEvaluationChartData = [["Prosečna evaluacija", "Godina"]];
  for (let i = 0; i < years.length; i++) {
    averageEvaluationChartData.push([years[i], averageEvaluation[i]]);
  }

  const totalParticipantsAll = data.reduce((acc, current) => {
    const num = parseInt(current["Broj polaznika"], 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const totalDaysAll = data.reduce((acc, current) => {
    const num = parseInt(current["Broj realizovanih dana"], 10);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);

  const totalTrainingsAll = data.reduce((acc, current) => {
    const year = current["Godina realizacije"];
    if (year && !isNaN(year)) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  function calculateOverallAverageEvaluation(data) {
    const allEvaluations = [];

    // Iteriranje kroz sve podatke
    data.forEach((item) => {
      const evaluation = item["Evaluacija opšta ocena"];

      // Provera da li je ocena validna
      if (evaluation) {
        const evaluationValue = parseFloat(evaluation.replace(",", ".").trim());
        if (!isNaN(evaluationValue) && evaluationValue !== 0) {
          allEvaluations.push(evaluationValue);
        }
      }
    });

    // Računanje ukupne prosečne ocene
    const validEvaluationsCount = allEvaluations.length;
    const totalEvaluationSum = allEvaluations.reduce(
      (total, evaluation) => total + evaluation,
      0
    );
    const overallAverage =
      validEvaluationsCount > 0
        ? (totalEvaluationSum / validEvaluationsCount).toFixed(2)
        : "Nema validnih ocena.";

    return overallAverage;
  }

  const averageEvaluationAll = calculateOverallAverageEvaluation(data);

  const counts = [
    {
      target: <CountUp end={totalTrainingsAll} duration={4} separator="." />,
      label: "Ukupan broj realizovanih obuka",
      icon: <GiTeacher />,
    },
    {
      target: <CountUp end={totalParticipantsAll} duration={4} separator="." />,
      label: "Ukupan broj polaznika",
      icon: <FaUserGraduate />,
    },
    {
      target: <CountUp end={totalDaysAll} duration={4} separator="." />,
      label: "Ukupan broj realizovanih dana",
      icon: <FaCalendarCheck />,
    },
  ];

  const getResponsiveFontSize = (width) => {
    if (width >= 960) {
      return "19px";
    } else {
      return "14px";
    }
  };

  const getResponsiveTableSize = (width) => {
    const a = width - 10;
    const b = width - 230;
    return isSmallScreen ? a : b;
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getAutocompleteStyles = () => ({
    textFieldStyles: {
      "& .MuiInputLabel-root": {
        color: "#b01d1f",
        fontFamily: "Open Sans, sans-serif",
        fontSize: "17px",
        transition: "color 0.3s",
      },
      "& .MuiOutlinedInput-root": {
        backgroundColor: "#f5f5f5",
        transition: "background-color 0.3s",
      },
      "&:hover .MuiInputLabel-root": {
        color: "#254081",
      },
      "&:hover .MuiOutlinedInput-root": {
        backgroundColor: "#E6F7FF",
      },
    },
    autocompleteStyles: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#b01d1f",
        borderWidth: "2.5px",
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#254081",
      },
    },
  });

  const { textFieldStyles, autocompleteStyles } = getAutocompleteStyles();

  const options = {
    tooltip: { isHtml: true },
    bar: { groupWidth: "80%" }, // Deblji barovi
    hAxis: {
      gridlines: { color: "transparent", count: 0 },
      ticks: [],
    },
    legend: { position: "none" },
    titleTextStyle: {
      fontSize: isSmallScreen ? 12 : 13.5,
      bold: true,
      color: "black",
      alignment: "end", // Poravnanje naslova
      fontName: "Open Sans, sans-serif",
    },
    titlePosition: "center",
  };

  const hoverEffect = (e, isHovering) => {
    e.currentTarget.firstChild.style.color = isHovering ? "#254081" : "#b01d1f";
    e.currentTarget.style.transform = isHovering ? "scale(1.1)" : "scale(1)";
  };

  const iconSize = isSmallScreen ? 17 : 35;
  const commonStyle = {
    marginRight: isSmallScreen ? "5px" : "20px",
    marginBottom: isSmallScreen ? "-60px" : "-120px",
    transition: "transform 0.2s, color 0.2s",
  };

  return (
    <Paper
      sx={{
        p: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
      elevation={0}
    >
      {/* Header Section with Logo and Main Content */}
      <div
        style={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr",
        }}
      >
        <div className="flex justify-between items-center flex-wrap">
          <a
            href="https://akademija.info/programi-obuka/index.html"
            target="_blank"
          >
            <img
              src={logo}
              alt="Logo"
              className="lg:ml-[100px]"
              style={{
                maxHeight: isSmallScreen ? "70px" : "160px",
                marginTop: "15px",
                marginLeft: isSmallScreen ? "20px" : "100px",
              }}
            />
          </a>

          <div className="flex items-center">
            {" "}
            <a
              href="https://www.linkedin.com/company/napasrbija/"
              style={commonStyle}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
              target="_blank"
            >
              <FaLinkedin size={iconSize} color="#b01d1f" />
            </a>
            <a
              href="https://www.facebook.com/napa.srbija/"
              style={commonStyle}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
              target="_blank"
            >
              <FaFacebook size={iconSize} color="#b01d1f" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCpGRggSbEC7z-js1vKmO4zQ"
              style={commonStyle}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
              target="_blank"
            >
              <FaYoutube size={iconSize} color="#b01d1f" />
            </a>
            <a
              href="https://www.instagram.com/napa.srbija/"
              style={{
                ...commonStyle,
                marginRight: isSmallScreen ? "35px" : "120px",
              }}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
              target="_blank"
            >
              <RiInstagramFill size={iconSize} color="#b01d1f" />
            </a>
          </div>
        </div>
        <div
          className="lg:mx-[115px]"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#E6F7FF",
            padding: "10px",
            maxHeight: isSmallScreen ? "295px" : "425px",
            marginBottom: "15px",
            marginTop: "10px",
            borderRadius: "15px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            marginLeft: isSmallScreen ? "18px" : "115px",
            marginRight: isSmallScreen ? "28px" : "115px",
          }}
        >
          <div>
            <h1
              className="pt-2 font-sans text-[#254081] text-center tracking-wide font-semibold mt-2"
              style={{
                fontSize: isSmallScreen ? "20px" : "30px",
                marginTop: isSmallScreen ? "-5px" : "0px",
              }}
            >
              AKADEMIJA U BROJKAMA
            </h1>
            <h2
              className="font-sans text-[#254081] text-center mb-4"
              style={{ fontSize: isSmallScreen ? "12px" : "18px" }}
            >
              Realizacija plana obuka od januara 2018. godine
            </h2>
            <div
              className="grid grid-cols-3 ml-auto mr-auto lg:gap-10 lg:w-48 sm:w-10"
              style={{ width: "fit-content", justifyContent: "space-between" }}
            >
              {/* Kartice s brojevima */}
              {counts.map(({ target, label, icon }, index) => (
                <div
                  className="bg-white p-4 rounded-lg shadow-md text-#254081 text-center transition duration-300 transform hover:scale-105 hover:shadow-xl hover:border-b-4 hover:border-red-600 hover:border-#b01d1f lg:w-48 sm: w-26 "
                  key={index}
                  style={{
                    height: isSmallScreen ? "140px" : "215px", // Prilagodite visinu kartice prema potrebi
                    maxWidth: isSmallScreen ? "110px" : "450px",
                    margin: "auto", // Centrirajte karticu u stupcu ako je manja od širine stupca
                    display: "flex",
                    marginRight: isSmallScreen ? "15px" : "20px",
                    marginLeft: isSmallScreen ? "15px" : "20px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#b01d1f",
                  }}
                >
                  <div style={{ marginBottom: "0.5rem" }}>
                    <div
                      className="text-[#b01d1f] sm:text-xl"
                      style={{
                        fontSize: isSmallScreen ? "37px" : "70px", // Postavljanje veličine na osnovu ekrana
                        marginTop: "10px",
                        paddingTop: "15px",
                      }}
                    >
                      {icon}
                    </div>
                  </div>

                  <h6
                    className="text-center  "
                    style={{
                      marginTop: "2px",
                      color: "#254081",
                      fontSize: isSmallScreen ? "11px" : "18px",
                    }}
                  >
                    {label}
                  </h6>
                  <h3
                    className="count lg:text-[36px] font-bold sm:text-[36px]"
                    style={{
                      fontSize: isSmallScreen ? "18px" : "36px",

                      paddingBottom: "15px",
                    }}
                  >
                    {target}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h1
              className="text-center mt-4  font-sans text-[#254081]"
              style={{ fontSize: isSmallScreen ? "12px" : "18px" }}
            >
              Prosečna evaluacija obuka:{" "}
              <span className="font-bold">
                {averageEvaluationAll.replace(".", ",")}/4
              </span>
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "10px",
              }}
            >
              <StarRatings
                rating={3.75}
                starDimension={isSmallScreen ? "30px" : "50px"}
                starSpacing="2px"
                starRatedColor="#b01d1f"
                starEmptyColor="#ddd"
                numberOfStars={4}
              />
            </div>
          </div>
        </div>
      </div>

      <Paper
        sx={{
          p: 0,
          marginTop: "15px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
        elevation={0}
      >
        {/* Program Autocomplete */}
        <div
          className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 lg:mx-[100px] md:mx-[20px] sm:mx-0"
          style={{
            marginTop: "15px",
            marginLeft: isSmallScreen ? "20px" : "120px",
            marginRight: isSmallScreen ? "30px" : "120px",
          }}
        >
          <div className="flex-1">
            {/* PROGRAMNAJU Autocomplete */}
            <Autocomplete
              options={programOptions
                .filter((option) => option !== "0")
                .sort((a, b) => a.localeCompare(b))}
              value={selectedProgram}
              onChange={(event, newValue) => setSelectedProgram(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Programi" sx={textFieldStyles} />
              )}
              sx={autocompleteStyles}
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => option || ""}
            />
          </div>
          <div className="flex-1">
            {/* TEMATSKA OBLASTNAJU Autocomplete */}
            <Autocomplete
              options={tematskaOblastOptions
                .filter((option) => option !== "0")
                .sort((a, b) => a.localeCompare(b))}
              value={selectedTematskaOblast}
              onChange={(event, newValue) =>
                setSelectedTematskaOblast(newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tematska oblast"
                  variant="outlined"
                  sx={textFieldStyles}
                />
              )}
              sx={autocompleteStyles}
              isOptionEqualToValue={(option, value) =>
                option === value || (!option && !value)
              }
              getOptionLabel={(option) => option || ""}
            />
          </div>
          <div className="flex-1">
            {/* Tip Obuke Autocomplete */}
            <Autocomplete
              options={tipObukeOptions
                .filter((option) => option !== "0")
                .sort((a, b) => a.localeCompare(b))}
              value={selectedTipObuke}
              onChange={(event, newValue) => setSelectedTipObuke(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Tip obuke" sx={textFieldStyles} />
              )}
              sx={autocompleteStyles}
              isOptionEqualToValue={(option, value) =>
                option === value || (!option && !value)
              }
              getOptionLabel={(option) => option || ""}
            />
          </div>
          <div className="flex-1">
            {/* Lokacija Autocomplete */}
            <Autocomplete
              options={lokacijaOptions
                .filter((option) => option !== "0")
                .sort((a, b) => a.localeCompare(b))}
              value={selectedLokacija}
              onChange={(event, newValue) => setSelectedLokacija(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Lokacija" sx={textFieldStyles} />
              )}
              sx={autocompleteStyles}
              isOptionEqualToValue={(option, value) =>
                option === value || (!option && !value)
              }
              getOptionLabel={(option) => option || ""}
            />
          </div>
        </div>

        {/* Tabs for Table and Charts */}
        <div
          className="lg:mx-[100px] "
          style={{
            marginTop: "15px",
            marginLeft: isSmallScreen ? "10px" : "120px",
            marginRight: isSmallScreen ? "10px" : "120px",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              sx={{
                "& .MuiTab-root": {
                  color: "#254081", // Boja teksta tabova
                  fontFamily: "Open Sans, sans-serif", // Font teksta tabova
                  fontSize: "15px", // Veličina fonta tabova
                  marginTop: "10px",
                  "&.Mui-selected": {
                    color: "#b01d1f", // Boja teksta za selektovani tab
                    fontWeight: "bold", // Debljina fonta za selektovani tab
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#b01d1f", // Boja indikatora selektovanog taba
                },
              }}
            >
              <Tab label="Tabela" />
              <Tab label="Grafikon" />
            </Tabs>
          </Box>
          {tabValue === 0 && (
            <div className="w-full overflow-x-auto">
              <TableContainer
                component={Paper}
                className="mt-36 w-full border border-gray-300 rounded shadow-md "
                style={{
                  marginTop: "20px",
                  overflowX: "auto",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 8px 18px rgba(0, 0, 0, 0.1)",
                  maxWidth: getResponsiveTableSize(windowWidth),
                }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow
                      style={{
                        backgroundColor: "#b01d1f",
                        height: "90px",
                      }}
                    >
                      <TableCell
                        style={{
                          fontFamily: "PFAdamantSansPro, sans-serif",
                          textAlign: "center",
                          color: "#ffffff",
                          width: "25%",
                          fontWeight: "bold",
                          fontSize: getResponsiveFontSize(windowWidth),
                        }}
                      >
                        Godina
                      </TableCell>
                      {years.map((year, index) => (
                        <TableCell
                          key={index}
                          style={{
                            fontFamily: "PFAdamantSansPro, sans-serif",
                            textAlign: "center",
                            color: "#ffffff",
                            width: `${75 / years.length}%`,
                            fontWeight: "bold",
                            fontSize: getResponsiveFontSize(windowWidth),
                          }}
                        >
                          {year}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      totalTrainings,
                      participants,
                      totalDays,
                      averageEvaluation,
                    ].map((data, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                        hover
                        role="checkbox"
                        style={{
                          height: "90px",
                          borderBottom: "1px  ",
                        }}
                      >
                        <TableCell
                          style={{
                            fontFamily: "PFAdamantSansPro, sans-serif",
                            textAlign: "center",
                            width: "25%",
                            fontSize: getResponsiveFontSize(windowWidth),
                          }}
                        >
                          {
                            [
                              "Ukupan broj realizovanih obuka",
                              "Ukupan broj polaznika",
                              "Ukupan broj realizovanih dana",
                              "Prosečna evaluacija",
                            ][rowIndex]
                          }
                        </TableCell>
                        {data.map((value, index) => (
                          <TableCell
                            key={index}
                            style={{
                              fontFamily: "PFAdamantSansPro, sans-serif",
                              textAlign: "center",
                              width: `${75 / years.length}%`,
                              fontSize: getResponsiveFontSize(windowWidth),
                            }}
                          >
                            {rowIndex !== 3
                              ? value.toLocaleString().replace(",", ".")
                              : value.toLocaleString().replace(".", ",")}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {tabValue === 1 && (
            <div className="flex flex-wrap justify-center  sm:mt-0 sm:mb-0">
              <Chart
                width={isSmallScreen ? "480px" : "500px"}
                height="550px"
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={totalTrainingsChartData}
                options={{
                  ...options,
                  title: "Broj realizovanih obuka po godinama 🎓",
                  series: {
                    0: { color: "#b01d1f" },
                  },
                }}
              />
              <Chart
                width={isSmallScreen ? "480px" : "500px"}
                height="550px"
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={participantsChartData}
                options={{
                  ...options,
                  title: "Broj polaznika po godinama 👩🏻‍💻",
                  series: {
                    0: { color: "#b01d1f" },
                  },
                }}
              />
              <Chart
                width={isSmallScreen ? "480px" : "500px"}
                height="550px"
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={totalDaysChartData}
                options={{
                  ...options,
                  title: "Broj realizovanih dana po godinama 🎯",
                  titleTextStyle: {
                    ...options.titleTextStyle,
                  },
                  series: {
                    0: { color: "#b01d1f" },
                  },
                }}
              />
              <div style={{ marginTop: "40px" }}>
                <Chart
                  chartType="AreaChart"
                  className="lg:w-[800px] lg:h-[550px] md:w-[600px] md:h-[400px] sm:w-[450px] sm:h-[600px]"
                  loader={<div>Loading Chart</div>}
                  width={isSmallScreen ? "480px" : "800px"}
                  height={isSmallScreen ? "450px" : "600px"}
                  data={averageEvaluationChartData}
                  options={{
                    title: "Prosečna ocena po godinama 🏆",
                    titleTextStyle: {
                      ...options.titleTextStyle,
                    },
                    vAxis: {
                      title: "Prosečna ocena",
                      minValue: 3.5,
                      maxValue: 4,
                      gridlines: { color: "transparent", count: 0 },
                    },
                    series: {
                      0: { color: "#b01d1f" },
                    },
                    legend: { position: "none" },
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <Footer2 />
      </Paper>
    </Paper>
  );
}

export default MainPage;
