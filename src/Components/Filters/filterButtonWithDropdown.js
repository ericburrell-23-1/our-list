import React, { Component } from "react";
import "./filterButton.scss";
import FilterButton from "./filterButton";

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
    this.setState((prevState) => ({
      areAllChecked: !prevState.areAllChecked,
      checkedOptions: prevState.areAllChecked
        ? new Set()
        : new Set(this.props.options),
    }));
  };

  toggleOption = (option) => {
    this.setState((prevState) => {
      const checkedOptions = new Set(prevState.checkedOptions);
      if (checkedOptions.has(option)) {
        checkedOptions.delete(option);
      } else {
        checkedOptions.add(option);
      }

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
