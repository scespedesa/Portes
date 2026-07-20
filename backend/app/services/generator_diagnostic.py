from app.enums.rules import RULES
def generate_diagnostic(incident):

    score = 0

    diagnostics = []

    actions = []

    for item in incident.type_incident:

        if item in RULES:

            score += RULES[item]["criticite"]

            diagnostics.append(
                RULES[item]["diagnostic"]
            )

            actions.append(
                RULES[item]["action"]
            )

    for item in incident.symptomes:

        if item in RULES:

            score += RULES[item]["criticite"]

            diagnostics.append(
                RULES[item]["diagnostic"]
            )

            actions.append(
                RULES[item]["action"]
            )

    return {
        "score": score,
        "diagnostic": diagnostics,
        "actions": actions
    }