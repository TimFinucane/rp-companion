import * as React from "react";
import * as ReactDOM from "react-dom";

import { Explorer } from "./explorer";

ReactDOM.render( <Explorer names={["A", "B", "C"]}/>, document.getElementById( "root" ) );