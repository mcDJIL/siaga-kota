# Evaluation Report

## Purpose
Assess the production readiness of the flood risk model.

## Metrics
- MAE: 1.5451
- MSE: 3.9683
- RMSE: 1.9921
- R2: 0.8407

## Explanation
The model uses a Random Forest regressor to estimate a flood risk score between 0 and 100.
The target is scaled from the original probability range to 0-100 so the score matches business expectations.
The metrics indicate regression quality and provide a baseline for production monitoring.