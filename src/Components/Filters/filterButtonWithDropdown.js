import React, { Component } from "react";
import "./FilterButton.scss";
import FilterButton from "./FilterButton";

class FilterButtonWithDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      areAllChecked: false,
      checkedOptions: new Set(),
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  toggleCheckAll = () => {
    this.setState(
      (prevState) => ({
        areAllChecked: !prevState.areAllChecked,
        checkedOptions: prevState.areAllChecked
          ? new Set()
          : new Set(this.props.options),
      }),
      () => {
        const { filter } = this.props;
        const checkedOptionsArray = Array.from(this.state.checkedOptions);
        this.props.onFilterChange(filter, checkedOptionsArray);
      }
    );
  };

  toggleOption = (option) => {
    this.setState((prevState) => {
      const checkedOptions = new Set(prevState.checkedOptions);
      if (checkedOptions.has(option)) {
        checkedOptions.delete(option);
      } else {
        checkedOptions.add(option);
      }

      const selectedOptions = Array.from(checkedOptions); // Convert Set to an array
      this.props.onFilterChange(this.props.filter, selectedOptions); // Call the prop function

      return {
        checkedOptions,
        areAllChecked: checkedOptions.size === this.props.options.length,
      };
    });
  };

  renderOptions = () => {
    return this.props.options.map((option) => (
      <label className="dropdown-option" key={option}>
        <input
          type="checkbox"
          name="dropdown-group"
          value={option}
          checked={this.state.checkedOptions.has(option)}
          onChange={() => this.toggleOption(option)}
        />
        {option}
      </label>
    ));
  };

  render() {
    return (
      <FilterButton
        filter={this.props.filter}
        renderOptions={this.renderOptions}
        label={{
          checkedOptions: this.state.checkedOptions,
          isOpen: this.state.isOpen,
          areAllChecked: this.state.areAllChecked,
          toggleDropdown: this.toggleDropdown,
          toggleCheckAll: this.toggleCheckAll,
        }}
      />
    );
  }
}

export default FilterButtonWithDropdown;
