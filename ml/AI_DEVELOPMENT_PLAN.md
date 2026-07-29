# AI Development Plan - SiagaKota

> Version 1.0
>
> This document serves as the master development plan for the AI module of SiagaKota.
>
> Every task must be completed sequentially.
> Never skip any phase.
>
> The AI assistant acts as a Senior Machine Learning Engineer and AI Architect.

---

# Project Overview

Project Name

SiagaKota

Main AI Feature

Flood Risk Prediction

Derived Features

- Dynamic Heatmap
- Priority Recommendation
- Task Prioritization

Target Deployment

- FastAPI
- Laravel Backend
- React Frontend

---

# AI Objective

The objective is NOT to predict whether flooding happens.

The objective is to generate a Flood Risk Score (0–100) for every district in Jember.

The generated score will power:

- Government Dashboard
- Heatmap Visualization
- Priority Recommendation
- Officer Assignment
- Analytics Dashboard

---

# Important Rules

Always think as a production AI engineer.

Never overengineer.

Always prioritize maintainability.

Every decision must be explainable.

Every feature used during training must also exist during production.

Never invent unavailable features.

If production data does not exist, redesign the model instead of hallucinating features.

---

# Development Workflow

The AI must complete every phase below sequentially.

Never jump directly into model training.

---

# PHASE 0

## Data Availability Mapping

Goal

Map every production feature before training.

Checklist

- List every available production feature.
- Identify feature source.
- Mark unavailable features.
- Remove unsupported features.
- Explain why each feature is needed.

Output

data_mapping.md

---

# PHASE 1

## Dataset Validation

Input

Flood Prediction Dataset (CSV)

Goal

Understand the dataset before doing anything.

Checklist

- Show dataset shape
- Show data types
- Detect missing values
- Detect duplicate rows
- Detect invalid values
- Explain every column
- Identify target column
- Suggest removable columns

Output

dataset_validation.ipynb

---

# PHASE 2

## Exploratory Data Analysis

Goal

Understand the dataset visually.

Checklist

Generate

- Histograms
- Correlation Matrix
- Heatmap
- Target Distribution
- Outlier Detection
- Feature Distribution

Explain every visualization.

Output

eda.ipynb

---

# PHASE 3

## Data Cleaning

Goal

Prepare production-quality data.

Checklist

Handle

- Missing Values
- Duplicate Data
- Incorrect Data Types
- Outliers
- Invalid Categories

Never remove data without explanation.

Output

clean_dataset.csv

---

# PHASE 4

## Feature Engineering

Goal

Transform the dataset into production-ready features.

Checklist

Create

- rainfall_today
- rainfall_last_3_days
- rainfall_last_7_days
- flood_reports_24h
- waste_reports_24h
- population_density
- elevation
- river_distance
- drainage_score

Remove unused features.

Explain every transformation.

Output

training_dataset.csv

---

# PHASE 5

## Feature Selection

Goal

Select the best features.

Checklist

Calculate

- Correlation
- Feature Importance
- Mutual Information (optional)

Explain

- Why each feature is kept.
- Why each feature is removed.

Output

selected_features.json

---

# PHASE 6

## Model Development

Start with

Random Forest

Do NOT start with Deep Learning.

Checklist

Split dataset

Train

Validate

Save model

Output

random_forest.pkl

---

# PHASE 7

## Hyperparameter Tuning

Improve model.

Methods

Grid Search

or

Random Search

Explain chosen parameters.

Output

best_model.pkl

---

# PHASE 8

## Model Evaluation

Generate

Accuracy

Precision

Recall

F1 Score

ROC Curve

Confusion Matrix

Feature Importance

Explain every metric.

Never only display numbers.

Output

evaluation_report.md

---

# PHASE 9

## Explainable AI

Goal

Explain WHY the model predicts high risk.

Generate

Feature Importance

Decision Explanation

Prediction Explanation

District Explanation

Output example

Patrang

Risk Score

91%

Main Factors

- Heavy Rainfall
- High Population Density
- Short River Distance

Output

prediction_explanation.md

---

# PHASE 10

## Risk Level Mapping

Convert probability into business values.

Example

0-40

LOW

41-70

MEDIUM

71-100

HIGH

Explain threshold selection.

Output

risk_mapping.py

---

# PHASE 11

## Recommendation Engine

This is NOT Machine Learning.

This is a Rule Engine.

Input

Risk Score

Output

Recommended Actions

Example

Risk > 80

↓

- Clean Drainage
- Deploy Water Pump
- Send BPBD Team

Output

recommendation.py

---

# PHASE 12

## Task Prioritization

Input

Risk Score

Flood Reports

Waste Reports

Generate

Priority Score

Sort descending.

Explain the scoring formula.

Output

assignment.py

---

# PHASE 13

## Prediction Pipeline

Build a prediction pipeline.

Input

Weather Data

District Features

Application Reports

↓

Feature Engineering

↓

Prediction

↓

Recommendation

↓

Priority

Output

predict.py

---

# PHASE 14

## API Preparation

Prepare model for FastAPI.

Do NOT build API yet.

Only prepare

- request schema
- response schema
- validation

Output

api_schema.md

---

# PHASE 15

## Model Packaging

Prepare final production folder.

Expected structure

ml/

datasets/

models/

reports/

src/

notebooks/

requirements.txt

README.md

---

# Coding Rules

Always use

Python

scikit-learn

pandas

numpy

matplotlib

Never use TensorFlow unless requested.

Prefer

Random Forest

XGBoost

LightGBM

Avoid overengineering.

---

# Documentation Rules

Every phase must contain

Purpose

Input

Output

Explanation

Next Step

Never skip documentation.

---

# AI Behavior

The AI assistant must behave as

- Senior Machine Learning Engineer
- Data Scientist
- AI Architect

The assistant must:

- Explain every decision.
- Reject bad practices.
- Suggest improvements.
- Think about production deployment.
- Never generate unnecessary complexity.

---

# Success Criteria

The AI development is complete when:

✅ Flood Risk Prediction works.

✅ Risk Score is generated.

✅ Heatmap can consume Risk Score.

✅ Recommendation Engine works.

✅ Task Prioritization works.

✅ Model is production-ready.

Only after all phases are complete should FastAPI integration begin.