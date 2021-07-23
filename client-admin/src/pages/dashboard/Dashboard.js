import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";



export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  const [numResponses, setNumResponses] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [q1Data, setQ1Data] = useState([0,0,0,0,0]);
  const [q2Data, setQ2Data] = useState([0,0,0,0,0]);
  const [q3Data, setQ3Data] = useState([0,0,0,0,0]);
  const [q4Data, setQ4Data] = useState([0,0,0,0,0]);
  const [q5Data, setQ5Data] = useState([0,0,0,0,0]);

  const q1data = [
    { name: "1", value: q1Data[0], color: "primary" },
    { name: "2", value: q1Data[1], color: "secondary" },
    { name: "3", value: q1Data[2], color: "warning" },
    { name: "4", value: q1Data[3], color: "success" },
    { name: "5", value: q1Data[4], color: "info" },
  ];
  
  const q2data = [
    { name: "1", value: q2Data[0], color: "primary" },
    { name: "2", value: q2Data[1], color: "secondary" },
    { name: "3", value: q2Data[2], color: "warning" },
    { name: "4", value: q2Data[3], color: "success" },
    { name: "5", value: q2Data[4], color: "info" },
  ];
  
  const q3data = [
    { name: "1", value: q3Data[0], color: "primary" },
    { name: "2", value: q3Data[1], color: "secondary" },
    { name: "3", value: q3Data[2], color: "warning" },
    { name: "4", value: q3Data[3], color: "success" },
    { name: "5", value: q3Data[4], color: "info" },
  ]

  const q4data = [
    { name: "1", value: q4Data[0], color: "primary" },
    { name: "2", value: q4Data[1], color: "secondary" },
    { name: "3", value: q4Data[2], color: "warning" },
    { name: "4", value: q4Data[3], color: "success" },
    { name: "5", value: q4Data[4], color: "info" },
  ];
  
  const q5data = [
    { name: "1", value: q5Data[0], color: "primary" },
    { name: "2", value: q5Data[1], color: "secondary" },
    { name: "3", value: q5Data[2], color: "warning" },
    { name: "4", value: q5Data[3], color: "success" },
    { name: "5", value: q5Data[4], color: "info" },
  ];

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/adminDashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      const user_name = parseRes.user_name;
      const totalStudents = parseRes.totalStudents;
      const totalRespondedToday = parseRes.totalRespondedToday;

      setNumResponses(totalRespondedToday);
      setNumStudents(totalStudents);

      const overallResponse = JSON.parse(parseRes.overallResponse);
      console.log(overallResponse);
      let q1Total = [0, 0, 0, 0, 0];
      let q2Total = [0, 0, 0, 0, 0];
      let q3Total = [0, 0, 0, 0, 0];
      let q4Total = [0, 0, 0, 0, 0];
      let q5Total = [0, 0, 0, 0, 0];
      overallResponse.forEach((res) => {
        q1Total[res.answer1 - 1] += 1;
        q2Total[res.answer2 - 1] += 1;
        q3Total[res.answer3 - 1] += 1;
        q4Total[res.answer4 - 1] += 1;
        q5Total[res.answer5 - 1] += 1;
      });
      setQ1Data(q1Total);
      setQ2Data(q2Total);
      setQ3Data(q3Total);
      setQ4Data(q4Total);
      setQ5Data(q5Total);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget
            title="Date"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {new Date().toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Total Students
                </Typography>
                <Typography size="md">{numStudents}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Number who responded today
                </Typography>
                <Typography size="md">{numResponses}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Completion Rate
                </Typography>
                <Typography size="md">
                  {(numResponses / numStudents).toFixed(4) * 100}%
                </Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Q1 Scores" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={q1data}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {q1data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {q1data.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography
                        style={{ whiteSpace: "nowrap", fontSize: 12 }}
                      >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Q2 Scores" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={q2data}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {q2data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {q2data.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography
                        style={{ whiteSpace: "nowrap", fontSize: 12 }}
                      >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Q3 Scores" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={q3data}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {q3data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {q3data.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography
                        style={{ whiteSpace: "nowrap", fontSize: 12 }}
                      >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Q4 Scores" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={q4data}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {q4data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {q4data.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography
                        style={{ whiteSpace: "nowrap", fontSize: 12 }}
                      >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget title="Q5 Scores" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={144}>
                  <PieChart>
                    <Pie
                      data={q5data}
                      innerRadius={30}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {q5data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={theme.palette[entry.color].main}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {q5data.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography
                        style={{ whiteSpace: "nowrap", fontSize: 12 }}
                      >
                        &nbsp;{name}&nbsp;
                      </Typography>
                      <Typography color="text" colorBrightness="secondary">
                        &nbsp;{value}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Widget>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Widget
            title="Students to Note"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Total Students
                </Typography>
                <Typography size="md">{numStudents}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Number who responded today
                </Typography>
                <Typography size="md">{numResponses}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="text" colorBrightness="secondary" noWrap>
                  Completion Rate
                </Typography>
                <Typography size="md">
                  {(numResponses / numStudents).toFixed(4) * 100}%
                </Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
