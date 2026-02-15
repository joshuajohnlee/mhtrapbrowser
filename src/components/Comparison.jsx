import React from 'react'

// Import context
import { useComparison } from '../contexts/ComparisonContext.jsx';

import weaponsList from '../assets/weapons.json';
import baseList from '../assets/bases.json';

export default function Comparison() {
    const comparisonContext = useComparison();

    const { weaponComparisonSlotOne, weaponComparisonSlotTwo, baseComparisonSlotOne, baseComparisonSlotTwo } = comparisonContext;

    const weapon1 = weaponsList.find(w => w.name === weaponComparisonSlotOne);
    const weapon2 = weaponsList.find(w => w.name === weaponComparisonSlotTwo);
    const base1 = baseList.find(b => b.name === baseComparisonSlotOne);
    const base2 = baseList.find(b => b.name === baseComparisonSlotTwo);

    const weaponComparisons = {
        "power": "both",
        "power_bonus": "both",
        "attraction_bonus": "both",
        "luck": "both"
    }

    const baseComparisons = {
        "power": "both",
        "power_bonus": "both",
        "attraction_bonus": "both",
        "luck": "both"
    }
    // Comparison

    if (weaponComparisonSlotOne != null && weaponComparisonSlotTwo != null) {

        for (const attribute in weaponComparisons) {
            if (weapon1[attribute] > weapon2[attribute]) {
                weaponComparisons[attribute] = "weapon1"
            } else if (weapon1[attribute] === weapon2[attribute]) {
                weaponComparisons[attribute] = "same"
            } else {
                weaponComparisons[attribute] = "weapon2"
            }
        }
    }

    if (baseComparisonSlotOne != null && baseComparisonSlotTwo != null) {
        for (const attribute in baseComparisons) {
            if (base1[attribute] > base2[attribute]) {
                baseComparisons[attribute] = "weapon1"
            } else if (base1[attribute] === base2[attribute]) {
                baseComparisons[attribute] = "same"
            } else {
                baseComparisons[attribute] = "weapon2"
            }
        }
    }

        return (
            <main>
                <h1>Comparison</h1>
                <section>
                    <h2>Weapons</h2>
                    <table className='comparison-table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{weaponComparisonSlotOne}</th>
                                <th>{weaponComparisonSlotTwo}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Power Type</th>
                                <td>{weapon1 ? weapon1.power_type || "N/A" : "N/A"}</td>
                                <td>{weapon2 ? weapon2.power_type || "N/A" : "N/A"}</td>
                            </tr>
                            <tr>
                                <th>Power</th>
                                <td className={weaponComparisons.power === "weapon1" ? "good-comparison" : weaponComparisons.power === "same" ? "same-comparison" : "bad-comparison"}>{weapon1 ? weapon1.power || "N/A" : "N/A"}</td>
                                <td className={weaponComparisons.power === "weapon1" ? "bad-comparison" : weaponComparisons.power === "same" ? "same-comparison" : "good-comparison"}>{weapon2 ? weapon2.power || "N/A" : "N/A"}</td>
                            </tr>
                            <tr>
                                <th>Power Bonus</th>
                                <td className={weaponComparisons.power_bonus === "weapon1" ? "good-comparison" : weaponComparisons.power_bonus === "same" ? "same-comparison" : "bad-comparison"}>{weapon1 ? (weapon1.power_bonus*100) + "%" || "N/A" : "N/A"}</td>
                                <td className={weaponComparisons.power_bonus === "weapon1" ? "bad-comparison" : weaponComparisons.power_bonus === "same" ? "same-comparison" : "good-comparison"}>{weapon2 ? (weapon2.power_bonus*100) + "%" || "N/A" : "N/A"}</td>
                            </tr>
                            <tr>
                                <th>Attraction Bonus</th>
                                <td className={weaponComparisons.attraction_bonus === "weapon1" ? "good-comparison" : weaponComparisons.attraction_bonus === "same" ? "same-comparison" : "bad-comparison"}>{weapon1 ? (weapon1.attraction_bonus*100) + "%" || "N/A" : "N/A"}</td>
                                <td className={weaponComparisons.attraction_bonus === "weapon1" ? "bad-comparison" : weaponComparisons.attraction_bonus === "same" ? "same-comparison" : "good-comparison"}>{weapon2 ? (weapon2.attraction_bonus*100) + "%" || "N/A" : "N/A"}</td>
                            </tr>
                            <tr>
                                <th>Luck</th>
                                <td className={weaponComparisons.luck === "weapon1" ? "good-comparison" : weaponComparisons.luck === "same" ? "same-comparison" : "bad-comparison"}>{weapon1 ? weapon1.luck || "N/A" : "N/A"}</td>
                                <td className={weaponComparisons.luck === "weapon1" ? "bad-comparison" : weaponComparisons.luck === "same" ? "same-comparison" : "good-comparison"}>{weapon2 ? weapon2.luck || "N/A" : "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section>
                    <h2>Bases</h2>
                    <table className='comparison-table'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>{baseComparisonSlotOne || "No Base Selected"}</th>
                                <th>{baseComparisonSlotTwo || "No Base Selected"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Power</th>
                                <td className={baseComparisons.power === "base1" ? "good-comparison" : baseComparisons.power === "same" ? "same-comparison" : "bad-comparison"}>{base1 ? base1.power || "N/A" : "N/A"}</td>
                                <td className={baseComparisons.power === "base1" ? "bad-comparison" : baseComparisons.power === "same" ? "same-comparison" : "good-comparison"}>{base2 ? base2.power || "N/A" : "N/A"}</td>
                            </tr>
                            <tr>
                                <th>Power Bonus</th>
                                <td className={baseComparisons.power_bonus === "base1" ? "good-comparison" : baseComparisons.power_bonus === "same" ? "same-comparison" : "bad-comparison"}>{base1 ? base1.power_bonus || "N/A" : "N/A"}</td>
                                <td className={baseComparisons.power_bonus === "base1" ? "bad-comparison" : baseComparisons.power_bonus === "same" ? "same-comparison" : "good-comparison"}>{base2 ? base2.power_bonus || "N/A" : "N/A"}</td>
                            </tr>
                            <tr>
                                <th>Attraction Bonus</th>
                                <td className={baseComparisons.attraction_bonus === "base1" ? "good-comparison" : baseComparisons.attraction_bonus === "same" ? "same-comparison" : "bad-comparison"}>{base1 ? base1.attraction_bonus || "N/A" : "N/A"}</td>
                                <td className={baseComparisons.attraction_bonus === "base1" ? "bad-comparison" : baseComparisons.attraction_bonus === "same" ? "same-comparison" : "good-comparison"}>{base2 ? base2.attraction_bonus || "N/A" : "N/A"}</td>
                            </tr>
                            <tr>
                                <th>Luck</th>
                                <td className={baseComparisons.luck === "base1" ? "good-comparison" : baseComparisons.luck === "same" ? "same-comparison" : "bad-comparison"}>{base1 ? base1.luck || "N/A" : "N/A"}</td>
                                <td className={baseComparisons.luck === "base1" ? "bad-comparison" : baseComparisons.luck === "same" ? "same-comparison" : "good-comparison"}>{base2 ? base2.luck || "N/A" : "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </main>
        )
    }