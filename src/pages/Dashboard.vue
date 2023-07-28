<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">('Your Currencies')</div>
                    <div class="card-body">

                            <div class="alert alert-success" role="alert">
                                 session('status') 
                            </div>
                            
                            <div class="alert alert-danger" role="alert">
                                @foreach ($errors->all() as $error)
                                     $error 
                                @endforeach
                            </div>

                        <!-- Add Chart.js graph -->
                        <div>
                            <canvas id="myChart"></canvas>
                        </div>

                        <!-- Add choose days -->
                        <label for="dateRangeSelect">Select Date Range:</label>
                        <select id="dateRangeSelect" name="dateRange">
                            <option value="6"  >$startDate == 6 ? 'selected' : '' </option>
                            <option value="12"  >$startDate == 12 ? 'selected' : '' </option>
                        </select>

                        @php
                            $lastCurrencies = $dayCurrencies->reverse()->unique('name');
                        @endphp

                        <div id="phpChartVariables">
                            <a id="labels"> $labels </a>
                            <a id="name"> $name </a>
                            <a id="data"> $data </a>
                            <a id="choosenID"> $choosenID </a>
                        </div>

                        <!-- Add DataTable -->
                        <form id="updateChartCurrency" action="{{ route('home.filtered') }}" method="POST">
                            @csrf
                            <table id="currencyTable" class="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Buy</th>
                                        <th>Sell</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($lastCurrencies as $currency)
                                        <tr data-currencyid="{{ $currency->id }}">
                                            <td> $currency->name </td>
                                            <td>$ number_format($currency->buy, 2) </td>
                                            <td>$ number_format($currency->sell, 2) </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            <input type="hidden" name="currencyId" id="currencyIdInput">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted } from "vue";
import api from "../http/api"

onMounted(async() => {
    const { data } = await api.get('/currencies')
    console.log(data)
})
</script>