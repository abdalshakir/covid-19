import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import InfoCard from './InfoCard';
import Table from './Table';
import { sortData } from '../util';

const Header = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            })
    }, [])

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2
                        }
                    ));
                    const sortedData = sortData(data);
                    setTableData(sortedData);
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        setCountry(countryCode);
        const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountry(countryCode)
                setCountryInfo(data);
            })
    }

    return (
        <div className="app__main">
            <div className="app__left">
                <div className="app__header">
                    <h1 className="text">COVID-19 Tracker</h1>
                    <FormControl className="app__dropdown">
                        <Select variant="outlined" onChange={onCountryChange} value={country}>
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {countries.map((country, ind) => (
                                <MenuItem value={country.value} key={ind}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="app__info">
                    <InfoCard title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
                    <InfoCard title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
                    <InfoCard title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
                </div>
            </div>
            <div className="app__right">
                <Card>
                    <CardContent>
                        <h3>Live Cases by Countries</h3>
                        <Table countries={tableData} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Header