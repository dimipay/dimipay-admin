import { styled } from "@/stitches.config";
import { Hexile } from "@haechi/flexile";

export const Wrapper = styled(Hexile, {
    borderRadius: "2rem",
    backgroundColor: "$dark6",
    border: `0.5rem solid $dark5`,
    paddingRight: "3rem",
    "& img": {
        opacity: 0.5
    }
})

export const LogicalInput = styled("input", {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: "$dark2",
    fontSize: "3.5rem",
    paddingLeft: "3rem",
    width: "30rem",
    "&::placeholder": {
        opacity: 0.6
    }
})